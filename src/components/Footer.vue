<template>
  <footer
    class="d-flex flex-col justify-center items-center m-0 py-8 text-center text-base text-gray-400"
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
