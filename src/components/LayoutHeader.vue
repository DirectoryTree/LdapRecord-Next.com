<template>
  <div class="py-2 border-b-4 border-ui-primary">
    <div class="container">
      <div class="flex items-center justify-between -mx-2 sm:-mx-4">
        <g-link to="/" class="px-2" title="Home">
          <!--
            We'll use <img> tags to load our <svg> logos due to
            issues of gradients conflicting with eachother on
            some browsers, causing them not to be displayed.
          -->
          <LogoIcon :width="50" class="inline-block md:hidden" />
          <Logo :width="175" class="hidden md:inline-block" />
        </g-link>

        <div class="w-full px-2 sm:px-4 max-w-screen-xs">
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>

        <div class="flex items-center flex-nowrap justify-end px-2 sm:px-4">
          <RepositorySelect class="hidden lg:flex items-center" />

          <ToggleDarkMode class="ml-0 lg:ml-8">
            <template #default="{ dark }">
              <MoonIcon v-if="dark" size="1.5x" />
              <SunIcon v-else size="1.5x" />
            </template>
          </ToggleDarkMode>
        </div>
      </div>
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
import Logo from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import { SunIcon, MoonIcon, GlobeIcon } from "vue-feather-icons";
import RepositorySelect from "@/components/RepositorySelect";

const Search = () =>
  import(/* webpackChunkName: "search" */ "@/components/Search").catch(
    (error) => console.warn(error)
  );

export default {
  components: {
    Logo,
    LogoIcon,
    Search,
    SunIcon,
    MoonIcon,
    GlobeIcon,
    ToggleDarkMode,
    RepositorySelect,
  },

  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    },
  },
};
</script>

<style lang="scss">
header {
  svg:not(.feather-search) {
    &:hover {
      @apply text-ui-primary;
    }
  }
}

.nav-link {
  &.active {
    @apply text-ui-primary font-bold border-ui-primary;
  }
}
</style>
