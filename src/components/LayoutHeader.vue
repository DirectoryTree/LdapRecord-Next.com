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
            <Search v-if="search" />
          </ClientOnly>
        </div>

        <div class="flex items-center flex-nowrap justify-end px-2 sm:px-4">
          <OnRepository>
            <div
              v-if="repository"
              class="flex items-center whitespace-nowrap"
              slot-scope="{ repository, currentVersion }"
            >
              <g-link
                v-if="repository.name === 'core'"
                :to="`/docs/laravel/${currentVersion}`"
                class="hidden lg:inline-flex text-ui-typo hover:text-ui-primary"
              >
                <LaravelIcon width="1.5em" height="1.5em" class="mr-1" />
                <span>Laravel</span>
              </g-link>

              <g-link
                v-if="repository.name === 'laravel'"
                :to="`/docs/core/${currentVersion}`"
                class="hidden lg:inline-flex text-ui-typo hover:text-ui-primary"
              >
                <BoxIcon size="1.5x" class="mr-1" />
                <span>Core</span>
              </g-link>

              <a
                v-if="repository.name === 'core'"
                :href="repository.url"
                class="hidden lg:inline-flex text-ui-typo hover:text-ui-primary sm:ml-3 whitespace-nowrap"
                title="Github"
                target="_blank"
                rel="noopener noreferrer"
                name="Core GitHub Repository"
              >
                <GithubIcon size="1.5x" class="mr-1" />
                <span>GitHub</span>
              </a>

              <a
                v-if="repository.name === 'laravel'"
                :href="repository.url"
                class="hidden lg:inline-flex text-ui-typo hover:text-ui-primary sm:ml-3 whitespace-nowrap"
                title="Github"
                target="_blank"
                rel="noopener noreferrer"
                name="Larvel GitHub Repository"
              >
                <GithubIcon size="1.5x" class="mr-1" />
                <span>GitHub</span>
              </a>
            </div>
          </OnRepository>

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
import LaravelIcon from "@/components/LaravelIcon";
import ToggleDarkMode from "@/components/ToggleDarkMode";
import {
  BoxIcon,
  SunIcon,
  MoonIcon,
  GlobeIcon,
  GithubIcon,
  TwitterIcon,
} from "vue-feather-icons";
import OnRepository from "@/components/OnRepository";

const Search = () =>
  import(/* webpackChunkName: "search" */ "@/components/Search").catch(
    (error) => console.warn(error)
  );

export default {
  components: {
    Logo,
    LogoIcon,
    Search,
    ToggleDarkMode,
    BoxIcon,
    SunIcon,
    MoonIcon,
    GlobeIcon,
    GithubIcon,
    TwitterIcon,
    LaravelIcon,
    OnRepository,
  },

  props: {
    search: {
      type: Boolean,
      default: false,
    },
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
