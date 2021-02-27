<template>
  <div class="font-sans antialiased text-ui-typo bg-ui-background">
    <div class="flex flex-col justify-start min-h-screen">
      <header
        ref="header"
        class="sticky top-0 z-20 w-full bg-ui-background h-16"
      >
        <LayoutHeader :search="search" />
      </header>

      <main
        class="relative flex flex-wrap justify-start flex-1 w-full bg-ui-background"
        :class="{ container: container }"
      >
        <aside
          v-if="hasSidebar"
          class="sidebar top-16"
          :class="{ open: sidebarOpen }"
          style="height: calc(100vh - 4rem)"
        >
          <div class="w-full pb-16 bg-ui-background">
            <Sidebar
              @navigate="sidebarOpen = false"
              :repository="repository"
              :version="version"
            />
          </div>
        </aside>

        <div
          class="w-full pb-24"
          :class="{ 'pl-0 lg:pl-12 lg:w-3/4': hasSidebar }"
        >
          <slot />
        </div>
      </main>
    </div>

    <Footer />

    <div v-if="hasSidebar" class="fixed bottom-0 right-0 z-50 p-8 lg:hidden">
      <button
        class="p-3 text-white rounded-full shadow-lg bg-ui-primary hover:text-white"
        @click="sidebarOpen = !sidebarOpen"
      >
        <XIcon v-if="sidebarOpen" />
        <MenuIcon v-else />
      </button>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import LayoutHeader from "@/components/LayoutHeader";
import { MenuIcon, XIcon } from "vue-feather-icons";

export default {
  props: {
    container: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Sidebar,
    Footer,
    LayoutHeader,
    MenuIcon,
    XIcon,
  },

  data() {
    return {
      sidebarOpen: false,
    };
  },

  watch: {
    sidebarOpen(isOpen) {
      document.body.classList.toggle("overflow-hidden", isOpen);
    },
  },

  computed: {
    hasSidebar() {
      return this.$page;
    },

    params() {
      const route = require("path-match")({
        sensitive: false,
        strict: false,
        end: false,
      });

      return route("/docs/:repository/:version/")(this.$route.path);
    },

    repository() {
      return this.params.repository;
    },

    version() {
      return this.params.version;
    },
  },

  metaInfo() {
    return {
      meta: [
        {
          key: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          key: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          key: "og:image",
          name: "og:image",
          content: process.env.SITE_URL + "/logo-card.png",
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: process.env.SITE_URL + "/logo-card.png",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./prism";
@import "./prism-dark";

:root {
  --color-ui-background: theme("colors.white");
  --color-ui-typo: theme("colors.gray.700");
  --color-ui-sidebar: theme("colors.gray.100");
  --color-ui-border: theme("colors.gray.300");
  --color-ui-primary: theme("colors.purple.600");
  --color-ui-secondary: theme("colors.gray.500");
  --color-ui-light: theme("colors.gray.50");
  --color-ui-shade: theme("colors.purple.50");

  .bg-gradient-l-purple-light {
    background-image: linear-gradient(
      to right,
      rgb(127, 0, 255) 0%,
      rgb(225, 0, 255) 100%
    );
  }
}

html[lights-out] {
  --color-ui-background: theme("colors.gray.900");
  --color-ui-typo: theme("colors.gray.100");
  --color-ui-sidebar: theme("colors.gray.800");
  --color-ui-border: theme("colors.gray.800");
  --color-ui-primary: theme("colors.purple.400");
  --color-ui-secondary: theme("colors.gray.300");
  --color-ui-light: theme("colors.gray.800");
  --color-ui-shade: theme("colors.purple.900");

  .bg-gradient-l-purple-light {
    background-image: linear-gradient(
      to right,
      rgb(212, 119, 255) 0%,
      rgb(255, 0, 234) 100%
    );
  }

  blockquote a {
    @apply text-ui-typo;
  }
}

* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

h1,
h2,
h3,
h4 {
  @apply leading-snug font-semibold mb-4 text-ui-typo;

  &[id]:before {
    content: "";
    display: block;
    height: 5rem;
    margin-top: -5rem;
  }

  &:hover {
    a::before {
      @apply opacity-100;
    }
  }

  a {
    &::before {
      content: "#";
      margin-left: -1em;
      padding-right: 1em;
      @apply text-ui-primary absolute opacity-0 float-left;
    }
  }
}

h1 {
  @apply text-4xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

p,
ol,
ul,
pre,
strong,
blockquote {
  @apply text-base text-ui-typo;
}

:not(pre) > code {
  @apply ring-1 ring-ui-sidebar bg-ui-light text-sm text-ui-primary px-2 py-px;
}

pre {
  @apply overflow-auto ring-1 ring-ui-sidebar bg-ui-light p-4;
}

code,
pre {
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  font-size: 1em;
  line-height: 1.5em;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  @apply text-ui-typo;
  @apply text-base;
  @apply font-mono;
}

.sidebar {
  @apply fixed bg-ui-background px-4 inset-x-0 bottom-0 w-full overflow-y-auto transition-all z-40;
  transform: translateX(-100%);

  &.open {
    transform: translateX(0);
  }

  @screen lg {
    @apply w-1/4 px-0 bg-transparent bottom-auto inset-x-auto sticky z-0;
    transform: translateX(0);
  }
}

.text-gradient {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
