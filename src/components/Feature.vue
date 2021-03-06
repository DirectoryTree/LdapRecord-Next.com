<template>
  <div class="pt-6">
    <div
      class="flow-root bg-ui-light ring-2 ring-ui-shade rounded-lg px-6 pb-8"
    >
      <div class="-mt-6">
        <div>
          <span
            class="inline-flex items-center justify-center p-3 bg-ui-primary rounded-md shadow-lg"
          >
            <slot name="icon"></slot>
          </span>
        </div>

        <h3 class="mt-8 text-lg font-semibold text-ui-typo tracking-tight">
          {{ name }}
        </h3>

        <p class="mt-5 text-base font-medium text-ui-secondary">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
  },
};
</script>
