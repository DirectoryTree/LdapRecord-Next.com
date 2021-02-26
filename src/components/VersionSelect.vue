<template>
  <div>
    <SidebarHeader>Version</SidebarHeader>

    <span class="inline-flex shadow-sm rounded-md">
      <g-link
        :key="index"
        :to="versionUrl(version)"
        v-for="(version, index) in repository.versions"
        :class="{
          'rounded-l-lg': index === 0,
          'rounded-r-lg': index === repository.versions.length - 1,
          active: currentVersion === version.slug,
        }"
        class="version-btn inline-flex items-center px-6 py-2 border border-ui-border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-ui-primary focus:border-ui-primary"
      >
        {{ version.name }}
      </g-link>
    </span>
  </div>
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
import SidebarHeader from "@/components/SidebarHeader";

export default {
  components: { SidebarHeader },

  created() {
    this.fetchCurrentVersion();
  },

  watch: {
    $route() {
      this.fetchCurrentVersion();
    },
  },

  data() {
    return {
      repository: null,
      currentVersion: null,
    };
  },

  computed: {
    versionUrl(version) {
      return ({ slug }) => {
        return this.repository?.versions.find(
          (version) => version.slug === slug
        ).uri;
      };
    },

    repositories() {
      return this.$static.metadata.settings.repositories;
    },
  },

  methods: {
    fetchCurrentVersion() {
      const route = require("path-match")({
        sensitive: false,
        strict: false,
        end: false,
      });

      const params = route("/docs/:repository/:version/")(this.$route.path);

      this.currentVersion = params.version;
      this.repository = this.repositories.find(
        (repository) => repository.name === params.repository
      );
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  .version-btn {
    @apply bg-ui-background text-ui-typo;

    &.active {
      @apply bg-gray-100 text-gray-900 font-bold;
    }
  }
}

html[lights-out] {
  .version-btn {
    @apply bg-ui-background text-ui-typo;

    &.active {
      @apply bg-gray-100 text-gray-900 font-bold;
    }
  }
}
</style>
