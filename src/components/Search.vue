<template>
  <div class="w-full flex justify-center">
    <search-modal :show="show" @close="show = false" />

    <div class="max-w-lg w-full">
      <label class="relative block">
        <span class="sr-only">Search Documentation</span>

        <div
          class="absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50"
        >
          <SearchIcon size="1.25x" class="text-ui-typo" />
        </div>

        <button
          type="button"
          tabindex="-1"
          @click="show = true"
          class="block w-full py-2 pl-10 pr-4 border rounded-lg bg-ui-light border-ui-border text-sm text-ui-secondary focus:bg-ui-background focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
        >
          Search <span class="hidden md:inline-block">Documentation</span>...
        </button>

        <div
          class="absolute inset-y-0 right-0 items-center justify-center hidden px-3 text-sm py-2 opacity-50 md:flex"
        >
          <kbd>/</kbd>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import SearchModal from "@/components/SearchModal";
import { ChevronRightIcon, SearchIcon } from "vue-feather-icons";

export default {
  components: {
    SearchModal,
    SearchIcon,
    ChevronRightIcon,
  },

  data() {
    return {
      show: false,
    };
  },

  created() {
    const openSearchOnSlash = (e) => {
      if (e.key === "/") {
        this.show = true;
      }
    };

    document.addEventListener("keydown", openSearchOnSlash);

    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", openSearchOnSlash);
    });
  },
};
</script>
