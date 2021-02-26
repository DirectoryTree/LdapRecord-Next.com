<template>
  <div>
    <div class="bg-ui-sidebar flex rounded-t-md p-3 space-x-2">
      <div class="bg-red-400 rounded-full h-3 w-3"></div>
      <div class="bg-yellow-400 rounded-full h-3 w-3"></div>
      <div class="bg-green-400 rounded-full h-3 w-3"></div>
    </div>

    <div class="flex justify-between overflow-x-scroll">
      <CodeWindowTabHeader
        v-for="tab in tabs"
        :key="tab.index"
        :active="activeTab == tab.id"
        @click.native="activeTab = tab.id"
      >
        {{ tab.name }}
      </CodeWindowTabHeader>
    </div>

    <div class="overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<script>
import CodeWindowTabHeader from "@/components/CodeWindowTabHeader";

export default {
  components: {
    CodeWindowTabHeader,
  },

  data() {
    return {
      activeTab: 0,
      tabs: [],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$slots.default.forEach((component, index) => {
        if (typeof component.componentOptions === "undefined") {
          return;
        }

        this.tabs.push({
          id: index,
          name: component.componentOptions.propsData["name"],
        });
      });

      this.selectTab(this.activeTab);
    });
  },

  watch: {
    activeTab(newValue, oldValue) {
      this.hideTab(oldValue);
      this.selectTab(newValue);
    },
  },

  methods: {
    selectTab(id) {
      this.activeTab = id;
      this.getTabSlotElementById(id).classList.toggle("hidden");
    },

    hideTab(id) {
      this.getTabSlotElementById(id).classList.toggle("hidden");
    },

    getTabSlotElementById(id) {
      return this.$slots.default[id].componentInstance.$el;
    },
  },
};
</script>
