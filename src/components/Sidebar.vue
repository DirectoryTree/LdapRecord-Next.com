<template>
  <div ref="sidebar" class="px-4 pt-8 lg:pt-12">
    <SidebarSection class="block lg:hidden">
      <SidebarHeader>Repository</SidebarHeader>

      <RepositorySelect class="flex items-center" />
    </SidebarSection>

    <SidebarSection>
      <VersionSelect />
    </SidebarSection>

    <SidebarSection
      class="pb-4 mb-4"
      :key="section.title"
      v-for="section in getSectionsForVersion(sidebar)"
    >
      <SidebarHeader>{{ section.name }}</SidebarHeader>

      <ul class="max-w-full mb-0">
        <li
          :id="page.path"
          :key="page.path"
          v-for="page in section.items"
          class="-ml-2 pl-2 text-sm font-semibold rounded-lg"
          :class="getClassesForAnchor(page)"
          @mousedown="$emit('navigate')"
        >
          <g-link :to="`${page.path}`" class="flex items-center py-1">
            {{ page.name }}
          </g-link>
        </li>
      </ul>
    </SidebarSection>
  </div>
</template>

<static-query>
query Sidebar {
  metadata {
    settings {
      sidebars {
        name
        versions {
          name
          sections {
            name,
            items {
              name
              path
            }
          }
        }
      }
    }
  }
}
</static-query>

<script>
import SidebarHeader from "@/components/SidebarHeader";
import SidebarSection from "@/components/SidebarSection";
import VersionSelect from "@/components/VersionSelect";
import RepositorySelect from "@/components/RepositorySelect";

export default {
  props: {
    repository: String,
    version: String,
  },

  components: {
    VersionSelect,
    SidebarHeader,
    SidebarSection,
    RepositorySelect,
  },

  data() {
    return {
      expanded: [],
    };
  },

  computed: {
    pages() {
      return this.$page.allMarkdownPage.edges.map((edge) => edge.node);
    },

    sidebar() {
      return this.$static.metadata.settings.sidebars.find(
        (sidebar) => sidebar.name === this.repository
      );
    },

    currentPage() {
      return this.$page.markdownPage;
    },

    currentPagePath() {
      const path = this.currentPage.path;

      return path.slice(0, -1);
    },
  },

  methods: {
    getClassesForAnchor({ path }) {
      return {
        "text-ui-typo bg-ui-shade font-semibold": this.currentPagePath === path,
        "text-ui-secondary hover:text-ui-primary transition transform hover:translate-x-1":
          this.currentPagePath !== path,
      };
    },

    getSectionsForVersion({ versions }) {
      return versions.find((version) => version.name === this.version)
        ?.sections;
    },

    findPages(links) {
      return links.map((link) => this.pages.find((page) => page.path === link));
    },
  },
};
</script>
