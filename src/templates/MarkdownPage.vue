<template>
  <Layout container search>
    <div class="flex flex-wrap items-start justify-start">
      <div
        style="top: 4rem"
        class="sticky order-2 w-full max-h-screen pb-8 overflow-y-scroll md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8"
      >
        <OnThisPage />
      </div>

      <div class="order-1 w-full md:w-2/3">
        <div
          v-if="!isOnLatestVersion"
          class="p-4 my-8 border border-ui-info bg-ui-shade rounded-md"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <AlertCircleIcon class="w-5 h-5 text-ui-typo" />
            </div>

            <div class="items-center flex-1 ml-3 md:flex md:justify-between">
              <p class="text-sm font-medium text-ui-typo">
                You're browsing documentation for an old version.
              </p>

              <p class="mt-3 text-sm md:mt-0 md:ml-6">
                <g-link
                  :to="latestVersionUri"
                  class="font-bold whitespace-nowrap text-ui-typo"
                >
                  View Current <span aria-hidden="true">&rarr;</span>
                </g-link>
              </p>
            </div>
          </div>
        </div>

        <div class="content" v-html="$page.markdownPage.content" />

        <div class="pt-8 mt-8 border-t lg:mt-12 lg:pt-12 border-ui-border">
          <NextPrevLinks />

          <div
            class="flex flex-col items-center justify-between md:flex-row space-y-4 md:space-y-0"
          >
            <div class="text-ui-secondary">
              Generated on {{ pageGeneratedDate }}
            </div>

            <EditOnGitHubButton :to="editOnGitHubUrl" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<static-query>
query {
  metadata {
    settings {
      docsUrl
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
    path
    title
    content
    timeToRead
    description
    generatedTime
    headings {
      depth
      value
      anchor
    }
    fileInfo {
      path
    }
  }
  allMarkdownPage {
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
import EditOnGitHubButton from "@/components/EditOnGitHubButton";

export default {
  components: {
    OnThisPage,
    NextPrevLinks,
    AlertCircleIcon,
    EditOnGitHubButton,
  },

  created() {
    this.setRepository();
  },

  mounted() {
    this.makeTablesResponsive();
  },

  watch: {
    $route() {
      this.setRepository();
      this.makeTablesResponsive();
    },
  },

  data() {
    return {
      repository: null,
      currentVersion: null,
    };
  },

  computed: {
    pageGeneratedDate() {
      return new Date(this.$page.markdownPage.generatedTime).toLocaleDateString(
        "en-ca",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "utc",
        }
      );
    },

    isOnLatestVersion() {
      return this.currentVersion === this.latestVersion?.slug;
    },

    latestVersionUri() {
      return this.latestVersion?.uri;
    },

    latestVersion() {
      return this.repository.versions[this.repository.versions.length - 1];
    },

    currentVersionDocsUri() {
      return this.repository.versions.find(
        ({ slug }) => slug === this.currentVersion
      ).docsUri;
    },

    repositories() {
      return this.$static.metadata.settings.repositories;
    },

    editOnGitHubUrl() {
      return (
        this.$static.metadata.settings.docsUrl +
        "/" +
        this.$page.markdownPage.fileInfo.path
      );
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

    makeTablesResponsive() {
      if (!process.isClient) {
        return;
      }

      // Here we will make all of the tables on the current page
      // responsive by wrapping them in a div that overflows to
      // ensure they can be scrolled horizontally on mobile.
      this.$nextTick(() => {
        document.documentElement
          .querySelectorAll("table:not([wrapped])")
          .forEach((table) => {
            const wrapper = document.createElement("div");

            wrapper.classList = ["border border-ui-border rounded-lg mb-4"];

            wrapper.style.overflowX = "scroll";

            table.setAttribute("wrapped", "");

            table.parentNode.insertBefore(wrapper, table);

            wrapper.appendChild(table);
          });
      });
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

<style lang="scss">
.content {
  &:first-child {
    @apply mt-4;

    @screen md {
      @apply mt-8;
    }

    @screen lg {
      @apply mt-14;
    }
  }

  p,
  ul,
  ol,
  blockquote,
  pre[class*="language-"] {
    @apply my-6;
  }

  a {
    @apply text-ui-primary underline;
  }

  ul {
    @apply list-disc;

    ul {
      list-style: circle;
    }
  }

  ol {
    @apply list-decimal;
  }

  ol,
  ul {
    @apply ml-5;

    li {
      @apply mb-2;

      p {
        @apply mb-0;
      }

      &:last-child {
        @apply mb-0;
      }
    }
  }

  blockquote {
    @apply border border-ui-info bg-ui-shade py-2 px-4 shadow rounded-lg;

    p:first-child {
      @apply mt-0;
    }

    p:last-child {
      @apply mb-0;
    }
  }

  code:not([class*="language-"]) {
    @apply rounded border border-ui-border;
  }

  pre[class*="language-"] {
    @apply max-w-full overflow-x-auto rounded-lg text-lg border border-ui-border;

    & > code[class*="language-"] {
      @apply border-none leading-relaxed;
    }
  }

  table {
    @apply w-full overflow-hidden text-left rounded-lg shadow-sm border border-ui-border divide-y divide-ui-border;

    thead {
      @apply bg-ui-light font-semibold text-xs text-ui-secondary tracking-wider uppercase;
    }

    tbody {
      @apply divide-y divide-ui-sidebar;
    }

    th {
      @apply p-2;
    }

    td {
      @apply p-2 text-sm bg-ui-background border-ui-border leading-relaxed;
    }
  }
}
</style>
