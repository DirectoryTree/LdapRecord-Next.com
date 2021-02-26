<template>
  <component
    :is="type"
    :to="to"
    :class="variants[variant]"
    class="flex items-center px-6 py-4 ml-auto text-2xl leading-none border rounded-lg transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false,
    },
    variant: {
      type: String,
      required: false,
      default: "primary",
    },
  },

  computed: {
    variants() {
      return {
        primary:
          "shadow-lg bg-ui-primary border-ui-primary font-bold text-white",
        secondary: "bg-ui-sidebar border-ui-sidebar text-ui-typo",
      };
    },

    type() {
      return this.to ? "g-link" : "button";
    },
  },
};
</script>
