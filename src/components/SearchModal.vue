<template>
  <modal
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
    @afterOpened="$refs.input.focus()"
    role="dialog"
  >
    <div class="bg-ui-background p-4 z-50">
      <div
        @keydown.down="increment"
        @keydown.up="decrement"
        @keydown.enter="go"
        class="relative"
      >
        <label class="relative block">
          <span class="sr-only">Search Documentation</span>

          <div
            class="absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50"
          >
            <SearchIcon size="1.25x" class="text-ui-typo" />
          </div>

          <input
            ref="input"
            type="search"
            v-model="query"
            class="block w-full py-2 pl-10 pr-4 border-2 rounded-lg bg-ui-sidebar border-ui-sidebar focus:bg-ui-background focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
            placeholder="Search Documentation..."
            @focus="focused = true"
            @blur="focused = false"
          />
        </label>

        <div
          v-if="showResult"
          class="overflow-y-auto results mt-2 md:mt-0"
          style="max-height: calc(100vh - 120px)"
        >
          <ul class="p-2 m-0">
            <li v-if="results.length === 0">
              No results for
              <span class="font-bold"> {{ query }} </span>
              .
            </li>

            <li
              v-else
              v-for="(result, index) in results"
              :key="result.path + result.anchor"
              @mouseenter="focusIndex = index"
              @mousedown="go"
              class="border-ui-sidebar"
              :class="{
                'border-b': index + 1 !== results.length,
              }"
            >
              <g-link
                :to="result.path + result.anchor"
                class="block p-2 -mx-2 text-base font-bold rounded-lg"
                :class="{
                  'bg-ui-sidebar text-ui-primary': focusIndex === index,
                }"
              >
                <span v-if="result.value === result.title">
                  {{ result.value }}
                </span>

                <span v-else class="flex items-center">
                  {{ result.title }}
                  <ChevronRightIcon size="1x" class="mx-1" />
                  <span class="font-normal opacity-75">
                    {{ result.value }}
                  </span>
                </span>
              </g-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="p-4 bg-ui-sidebar flex justify-between text-xs">
      <div><kbd>↵</kbd> to select</div>

      <div class="space-x-1">
        <kbd>↑</kbd>
        <kbd>↓</kbd> to navigate
      </div>

      <div><kbd>ESC</kbd> to close</div>
    </div>
  </modal>
</template>

<static-query>
query {
  metadata {
    settings {
      repositories {
        name
        url
        versions {
          name
          slug
          uri
        }
      }
    }
  }
  allMarkdownPage{
    edges {
      node {
        id
        path
        title
        headings {
        	depth
          value
          anchor
      	}
      }
    }
  }
}
</static-query>

<script>
import Fuse from "fuse.js";
import Modal from "@/components/Modal";
import compareVersions from "compare-versions";
import { ChevronRightIcon, SearchIcon } from "vue-feather-icons";

export default {
  components: {
    Modal,
    SearchIcon,
    ChevronRightIcon,
  },

  props: {
    show: {
      default: false,
    },
    maxWidth: {
      default: "2xl",
    },
    closeable: {
      default: true,
    },
  },

  data() {
    return {
      query: "",
      focused: false,
      focusIndex: -1,
    };
  },

  watch: {
    query() {
      // Reset the focus index when the search query changes.
      this.focusIndex = -1;
    },
  },

  computed: {
    results() {
      const fuse = new Fuse(this.headings, {
        keys: ["value"],
        threshold: 0.25,
      });

      return fuse.search(this.query).slice(0, 15);
    },

    pages() {
      return this.$static.allMarkdownPage.edges.map((edge) => edge.node);
    },

    repositories() {
      return this.$static.metadata.settings.repositories;
    },

    headings() {
      let result = [];

      const allPages = this.filterMatchingPages(this.pages);

      // Create the array of all headings of all pages.
      allPages.forEach((page) => {
        page.headings.forEach((heading) => {
          result.push({
            ...heading,
            path: page.path,
            title: page.title,
          });
        });
      });

      return result;
    },

    showResult() {
      // Show results, if the input is focused and the query is not empty.
      return this.query.length > 0;
    },
  },

  methods: {
    increment() {
      if (this.focusIndex < this.results.length - 1) {
        this.focusIndex++;
      }
    },

    decrement() {
      if (this.focusIndex >= 0) {
        this.focusIndex--;
      }
    },

    go() {
      // Do nothing if we don't have results.
      if (this.results.length === 0) {
        return;
      }

      let result;

      // If we don't have focus on a result, just navigate to the first one.
      if (this.focusIndex === -1) {
        result = this.results[0];
      } else {
        result = this.results[this.focusIndex];
      }

      this.$router.push(result.path + result.anchor).catch(() => {
        // Redundant location.
      });

      // Unfocus the input and reset the query.
      this.query = "";

      this.close();
    },

    filterMatchingPages(pages) {
      let repositories = this.getSearchableRepositories();

      return pages.filter((page) => {
        const params = this.getRouteParams(page.path);

        if (!params) {
          return false;
        }

        const { repository: pageRepository, version: pageVersion } = params;

        return repositories.find(
          ({ name, latest }) =>
            name === pageRepository && pageVersion === latest
        );
      });
    },

    getSearchableRepositories() {
      // If a search is being executed on the home page, we will
      // grab a list of all the repositories along with their
      // most current version to filter our page result.
      if (this.isOnHomePage()) {
        return this.repositories.map(({ name, versions }) => ({
          name: name,
          latest: versions
            .map(({ slug }) => slug)
            .sort(compareVersions)
            .reverse()[0],
        }));
      }

      // Otherwise, the search attempt must be being made on a
      // specific repository. In this case, we will fetch the
      // repository through the URL, along with the version.
      const { repository, version } = this.getRouteParams(this.$route.path);

      return [
        {
          name: repository,
          latest: version,
        },
      ];
    },

    getRouteParams(path) {
      const route = require("path-match")({
        sensitive: false,
        strict: false,
        end: false,
      });

      return route("/docs/:repository/:version/")(path);
    },

    isOnHomePage() {
      return this.$route.path === "/";
    },

    close() {
      this.$refs.input.blur();

      this.$emit("close");
    },
  },
};
</script>
