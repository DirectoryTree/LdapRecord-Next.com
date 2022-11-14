<template>
  <modal
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
    @afterOpened="focusSearchInput"
    role="dialog"
  >
    <div class="z-50 p-4 bg-ui-background">
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
          class="mt-2 overflow-y-auto results md:mt-0"
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
              :key="index"
              @mouseenter="focusIndex = index"
              @mousedown="go"
              class="border-ui-sidebar"
              :class="{
                'border-b': index + 1 !== results.length,
              }"
            >
              <g-link
                :to="url(result)"
                class="block p-2 -mx-2 text-base font-bold rounded-lg"
                :class="{
                  'bg-ui-sidebar text-ui-primary': focusIndex === index,
                }"
              >
                <div
                  v-if="result._highlightResult.hierarchy.lvl0"
                  class="font-medium"
                  v-html="
                    result._highlightResult.hierarchy.lvl0
                      ? result._highlightResult.hierarchy.lvl0.value
                      : ''
                  "
                ></div>

                <div class="mt-2">
                  <div
                    v-if="result._highlightResult.hierarchy.lvl1"
                    class="text-sm"
                  >
                    <span class="mr-1 opacity-75 text-ui-primary">#</span>

                    <span
                      v-html="
                        result._highlightResult.hierarchy.lvl1
                          ? result._highlightResult.hierarchy.lvl1.value
                          : ''
                      "
                    ></span>
                  </div>

                  <div
                    v-if="result._highlightResult.hierarchy.lvl2"
                    class="flex items-center text-sm"
                  >
                    <ChevronRightIcon size="1x" class="mr-1" />

                    <span
                      v-html="
                        result._highlightResult.hierarchy.lvl2
                          ? result._highlightResult.hierarchy.lvl2.value
                          : ''
                      "
                    ></span>
                  </div>

                  <div
                    v-if="result._highlightResult.hierarchy.lvl3"
                    class="flex items-center text-sm"
                  >
                    <ChevronRightIcon size="1x" class="mr-1" />
                    <span
                      v-html="
                        result._highlightResult.hierarchy.lvl3
                          ? result._highlightResult.hierarchy.lvl3.value
                          : ''
                      "
                    ></span>
                  </div>

                  <div
                    v-if="result._highlightResult.hierarchy.lvl4"
                    class="flex items-center text-sm"
                  >
                    <ChevronRightIcon size="1x" class="mr-1" />
                    <span
                      v-html="
                        result._highlightResult.hierarchy.lvl4
                          ? result._highlightResult.hierarchy.lvl4.value
                          : ''
                      "
                    ></span>
                  </div>

                  <div
                    v-if="result._highlightResult.hierarchy.lvl5"
                    class="flex items-center text-sm"
                  >
                    <ChevronRightIcon size="1x" class="mr-1" />
                    <span
                      v-html="
                        result._highlightResult.hierarchy.lvl5
                          ? result._highlightResult.hierarchy.lvl5.value
                          : ''
                      "
                    ></span>
                  </div>

                  <div
                    v-if="result._highlightResult.content"
                    v-html="
                      result._highlightResult.content
                        ? result._highlightResult.content.value
                        : ''
                    "
                    class="p-2 overflow-hidden text-xs font-normal truncate rounded-lg whitespace-nowrap bg-gray-50"
                  ></div>
                </div>
              </g-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex justify-between p-4 text-xs bg-ui-sidebar">
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
  }
</static-query>

<script>
import Modal from "@/components/Modal";
import "@algolia/autocomplete-theme-classic";
import algoliasearch from "algoliasearch/lite";
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
    const searchClient = algoliasearch(
      process.env.GRIDSOME_ALGOLIA_APP_ID,
      process.env.GRIDSOME_ALGOLIA_API_KEY
    );

    const index = searchClient.initIndex(
      process.env.GRIDSOME_ALGOLIA_API_INDEX
    );

    return {
      index,
      query: "",
      results: [],
      focused: false,
      focusIndex: -1,
      searching: false,
    };
  },

  watch: {
    query(value) {
      this.searching = true;

      // Reset the focus index when the search query changes.
      this.focusIndex = -1;

      const versions = this.getSearchableRepositories().map(
        ({ latest }) => `version:${latest}`
      );

      this.index
        .search(value, {
          hitsPerPage: 5,
          facetFilters: [versions],
          highlightPreTag: '<em class="not-italic bg-ui-shade">',
          highlightPostTag: "</em>",
        })
        .then(({ hits }) => {
          this.results = hits;
          this.searching = false;
        });
    },
  },

  computed: {
    repositories() {
      return this.$static.metadata.settings.repositories;
    },

    showResult() {
      // Show results, if the input is focused and the query is not empty.
      return this.query.length > 0;
    },
  },

  methods: {
    url(result) {
      const { pathname, hash } = new URL(result.url);

      return pathname + hash;
    },

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

      this.$router.push(this.url(result)).catch(() => {
        // Redundant location.
      });

      // Unfocus the input and reset the query.
      this.query = "";

      this.close();
    },

    focusSearchInput() {
      this.$nextTick(() => this.$refs.input?.focus());
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
      this.$refs.input?.blur();

      this.$emit("close");
    },
  },
};
</script>
