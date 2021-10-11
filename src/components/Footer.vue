<template>
  <footer
    class="flex-col items-center justify-center py-8 m-0 text-base text-center text-gray-400 d-flex"
  >
    <g-link to="https://github.com/directorytree">
      <DirectoryTreeSvg
        class="inline mb-2 hover:text-blue-500"
        width="45"
        height="45"
      />
    </g-link>

    <div>&copy; {{ new Date().getFullYear() }} DirectoryTree</div>
  </footer>
</template>

<script>
import DirectoryTreeSvg from "@/components/DirectoryTreeLogo";

export default {
  components: {
    DirectoryTreeSvg,
  },
};
</script>
