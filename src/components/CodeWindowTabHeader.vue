<template>
  <div
    class="flex flex-grow whitespace-nowrap justify-between items-center px-4 py-1 cursor-pointer code-tab"
    :class="{
      highlighted: active,
    }"
  >
    <div class="text-ui-typo font-bold">&times;</div>
    <div
      class="flex-fill flex-grow ml-4 text-ui-typo font-medium text-center text-sm"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  .code-tab {
    @apply bg-gray-200 hover:bg-gray-300;

    &.highlighted {
      @apply bg-gray-300 hover:bg-gray-400;
    }
  }
}

html[lights-out] {
  .code-tab {
    @apply bg-gray-500 hover:bg-gray-600;

    &.highlighted {
      @apply bg-gray-700 hover:bg-gray-800;
    }
  }
}
</style>
