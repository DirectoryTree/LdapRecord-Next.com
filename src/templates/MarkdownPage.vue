<template>
  <Layout container>
    <div class="flex flex-wrap items-start justify-start">
      <div
        style="top: 4rem"
        class="sticky overflow-y-scroll max-h-screen order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 pb-8"
      >
        <OnThisPage />
      </div>

      <div class="order-1 w-full md:w-2/3">
        <div
          v-if="!isOnLatestVersion"
          class="bg-ui-primary rounded-md p-4 my-8"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <AlertCircleIcon class="h-5 w-5 text-ui-shade" />
            </div>

            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="font-medium text-sm text-ui-shade">
                You're browsing documentation for an old version.
              </p>

              <p class="mt-3 text-sm md:mt-0 md:ml-6">
                <g-link
                  :to="latestVersionUri"
                  class="whitespace-nowrap font-medium text-ui-shade"
                >
                  View Current <span aria-hidden="true">&rarr;</span>
                </g-link>
              </p>
            </div>
          </div>
        </div>

        <div class="content" v-html="$page.markdownPage.content" />

        <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
          <NextPrevLinks />
        </div>
      </div>
    </div>
  </Layout>
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

<page-query>
query ($id: ID!) {
  markdownPage(id: $id) {
    id
    title
    description
    path
    timeToRead
    content
    headings {
      depth
      value
      anchor
    }
  }
  allMarkdownPage{
    edges {
      node {
        path
        title
      }
    }
  }
}
</page-query>

<script>
import { AlertCircleIcon } from "vue-feather-icons";
import OnThisPage from "@/components/OnThisPage.vue";
import NextPrevLinks from "@/components/NextPrevLinks.vue";

export default {
  components: {
    OnThisPage,
    NextPrevLinks,
    AlertCircleIcon,
  },

  created() {
    this.setRepository();
  },

  watch: {
    $route() {
      this.setRepository();
    },
  },

  data() {
    return {
      repository: null,
      currentVersion: null,
    };
  },

  computed: {
    isOnLatestVersion() {
      return this.currentVersion === this.latestVersion?.slug;
    },

    latestVersionUri() {
      return this.latestVersion?.uri;
    },

    latestVersion() {
      return this.repository.versions[this.repository.versions.length - 1];
    },

    repositories() {
      return this.$static.metadata.settings.repositories;
    },
  },

  methods: {
    setRepository() {
      const route = require("path-match")({
        sensitive: false,
        strict: false,
        end: false,
      });

      const { repository, version } = route("/docs/:repository/:version/")(
        this.$route.path
      );

      this.currentVersion = version;
      this.repository = this.repositories.find((r) => r.name === repository);
    },
  },

  metaInfo() {
    const title = this.$page.markdownPage.title;

    const description =
      this.$page.markdownPage.description || this.$page.markdownPage.excerpt;

    return {
      title: title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          key: "og:title",
          name: "og:title",
          content: title,
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          key: "og:description",
          name: "og:description",
          content: description,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: description,
        },
      ],
    };
  },
};
</script>
