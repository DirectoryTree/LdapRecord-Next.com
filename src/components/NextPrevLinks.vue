<template>
  <div>
    <div class="flex flex-col items-center justify-between sm:flex-row">
      <g-link
        v-if="prev"
        :to="prev.path"
        class="flex items-center px-4 py-2 mb-4 mr-auto font-bold border rounded-lg sm:mb-0 text-ui-primary border-ui-border hover:bg-ui-primary hover:text-white transition-colors"
      >
        <ArrowLeftIcon class="mr-2" size="1x" />
        {{ prev.title }}
      </g-link>

      <g-link
        v-if="next"
        :to="next.path"
        class="flex items-center px-4 py-2 ml-auto font-bold border rounded-lg text-ui-primary border-ui-border hover:bg-ui-primary hover:text-white transition-colors"
      >
        {{ next.title }}
        <ArrowRightIcon class="ml-2" size="1x" />
      </g-link>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon } from 'vue-feather-icons';

export default {
  components: {
    ArrowLeftIcon,
    ArrowRightIcon
  },

  computed: {
    page() {
      return this.$page.markdownPage;
    },
    pages() {
      return this.$page.allMarkdownPage.edges.map(edge => edge.node);
    },
    next() {
      if (this.pages && ! this.page.next) {
        return false;
      }

      return this.pages.find(page => page.path === this.page.next);
    },
    prev() {
      if (this.pages && ! this.page.prev) {
        return false;
      }

      return this.pages.find(page => page.path === this.page.prev);
    }
  }
};
</script>
