<template>
  <div
    :class="{ highlighted: active }"
    class="relative flex items-center justify-between flex-grow px-4 py-2 cursor-pointer whitespace-nowrap code-tab text-ui-secondary select-none"
  >
    <div class="absolute font-bold hover:bg-ui-border rounded-lg w-6 h-6 flex items-center justify-center" @click="$bus.$emit('easter')">
      <XIcon class="w-3 h-3"/>
    </div>

    <div
      class="flex-grow ml-4 text-xs font-medium text-center flex-fill"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { XIcon } from "vue-feather-icons";

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  components: { XIcon },
};
</script>

<style lang="scss" scoped>
:root {
  .code-tab {
    @apply bg-gray-100 hover:bg-gray-200;

    &.highlighted {
      @apply bg-gray-200;
    }
  }
}

html[lights-out] {
  .code-tab {
    @apply bg-gray-500 hover:bg-gray-600;

    &.highlighted {
      @apply bg-gray-700;
    }
  }
}
</style>
