<template>
  <img
    src="/logo-icon.svg"
    :style="{ width: `${width}px`, minWidth: `${width}px` }"
  />
</template>

<script>
export default {
  props: {
    width: Number,
  },
};
</script>
