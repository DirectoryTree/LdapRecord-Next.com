<template>
  <div>
    <div
      class="flex flex-col items-center m-0 md:mx-12"
      :class="{
        'lg:flex-row': !alternate,
        'lg:flex-row-reverse': alternate,
      }"
    >
      <div class="w-full lg:w-1/2 px-4 mx-auto">
        <div>
          <div class="flex lg:flex-col items-center lg:items-start">
            <div class="mr-2">
              <span
                class="h-12 w-12 rounded-md flex items-center justify-center bg-ui-primary"
              >
                <slot name="icon"></slot>
              </span>
            </div>

            <div class="lg:mt-6">
              <h2
                class="text-3xl lg:text-6xl font-extrabold tracking-tight leading-none text-ui-typo m-0"
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
              class="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ui-primary hover:bg-indigo-700"
            >
              {{ link }}
            </a>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/2 h-full px-4 mx-auto my-6">
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
