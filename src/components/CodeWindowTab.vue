<template>
  <div class="hidden">
    <VueMarkdown :source="source" />
  </div>
</template>

<style scoped>
pre {
  @apply border-none;
}
</style>

<script>
import VueMarkdown from "vue-markdown";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-php";

export default {
  props: {
    name: String,
    source: String,
  },

  components: {
    VueMarkdown,
  },

  mounted() {
    Prism.highlightAll();
  },
};
</script>
