<template>
  <div
    class="flex items-center justify-between flex-grow px-4 py-1 cursor-pointer whitespace-nowrap code-tab"
    :class="{
      highlighted: active,
    }"
  >
    <div class="font-bold text-ui-typo">&times;</div>
    <div
      class="flex-grow ml-4 text-sm font-medium text-center flex-fill text-ui-typo"
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
