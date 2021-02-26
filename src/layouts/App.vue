<template>
  <div class="font-sans antialiased text-ui-typo bg-ui-background">
    <div class="flex flex-col justify-start min-h-screen">
      <header
        ref="header"
        class="sticky top-0 z-20 w-full bg-ui-background h-16"
      >
        <LayoutHeader />
      </header>

      <main
        class="relative flex flex-wrap justify-start flex-1 w-full bg-ui-background"
        :class="{ container: container }"
      >
        <aside
          v-if="hasSidebar"
          class="sidebar top-16"
          style="height: calc(100vh - 4rem)"
          :class="{ open: sidebarOpen }"
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
          content: process.env.SITE_URL + "/logo.jpg",
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: process.env.SITE_URL + "/logo.jpg",
        },
      ],
    };
  },
};
</script>
