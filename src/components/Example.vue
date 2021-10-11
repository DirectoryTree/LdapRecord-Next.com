<template>
  <div>
    <div
      class="flex flex-col items-center m-0 md:mx-12"
      :class="{
        'lg:flex-row': !alternate,
        'lg:flex-row-reverse': alternate,
      }"
    >
      <div class="w-full px-4 mx-auto lg:w-1/2">
        <div>
          <div class="flex items-center lg:flex-col lg:items-start">
            <div class="mr-2">
              <span
                class="flex items-center justify-center w-12 h-12 rounded-md bg-ui-primary"
              >
                <slot name="icon"></slot>
              </span>
            </div>

            <div class="lg:mt-6">
              <h2
                class="m-0 text-3xl font-extrabold leading-none tracking-tight lg:text-6xl text-ui-typo"
              >
                {{ title }}

                <br />

                <span class="text-gradient bg-gradient-l-purple-light">
                  {{ subtitle }}
                </span>
              </h2>
            </div>
          </div>

          <p class="mt-4 text-lg text-ui-secondary">
            <slot name="description"></slot>
          </p>

          <div class="mt-6" v-if="link && href">
            <a
              :href="href"
              class="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-ui-primary hover:bg-indigo-700"
            >
              {{ link }}
            </a>
          </div>
        </div>
      </div>

      <div class="w-full h-full px-4 mx-auto my-6 lg:w-1/2">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    alternate: {
      type: Boolean,
      default: false,
      required: false,
    },
    href: String,
    link: String,
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
