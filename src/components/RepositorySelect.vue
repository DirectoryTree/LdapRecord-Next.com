<template>
  <OnRepository>
    <div
      v-if="repository"
      class="whitespace-nowrap"
      slot-scope="{ repository, currentVersion, getLatestVersion }"
    >
      <g-link
        v-if="repository.name === 'core'"
        :to="getLatestVersion('laravel').uri"
        class="inline-flex text-ui-typo hover:text-ui-primary"
      >
        <LaravelIcon width="1.5em" height="1.5em" class="mr-1" />
        <span>Laravel</span>
      </g-link>

      <g-link
        v-if="repository.name === 'laravel'"
        :to="getLatestVersion('core').uri"
        class="inline-flex text-ui-typo hover:text-ui-primary"
      >
        <BoxIcon size="1.5x" class="mr-1" />
        <span>Core</span>
      </g-link>

      <a
        :href="repository.url"
        v-if="repository.name === 'core'"
        target="_blank"
        rel="noopener noreferrer"
        title="Core GitHub Repository"
        class="inline-flex ml-3 text-ui-typo hover:text-ui-primary whitespace-nowrap"
      >
        <GithubIcon size="1.5x" class="mr-1" />
        <span>GitHub</span>
      </a>

      <a
        :href="repository.url"
        v-if="repository.name === 'laravel'"
        target="_blank"
        rel="noopener noreferrer"
        title="Larvel GitHub Repository"
        class="inline-flex ml-3 text-ui-typo hover:text-ui-primary whitespace-nowrap"
      >
        <GithubIcon size="1.5x" class="mr-1" />
        <span>GitHub</span>
      </a>
    </div>
  </OnRepository>
</template>

<script>
import LaravelIcon from "@/components/LaravelIcon";
import OnRepository from "@/components/OnRepository";
import { BoxIcon, GithubIcon } from "vue-feather-icons";

export default {
  components: {
    BoxIcon,
    GithubIcon,
    LaravelIcon,
    OnRepository,
  },
};
</script>
