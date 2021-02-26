<script>
import repositories from "../repositories.json";

export default {
  data() {
    return {
      repository: null,
      currentVersion: null,
    };
  },

  created() {
    this.setRepository();
  },

  watch: {
    $route() {
      this.setRepository();
    },
  },

  render() {
    return this.$scopedSlots.default({
      repository: this.repository,
      currentVersion: this.currentVersion,
    });
  },

  methods: {
    setRepository() {
      const route = require("path-match")({
        sensitive: false,
        strict: false,
        end: false,
      });

      const { repository, version } = route("/docs/:repository/:version/")(
        this.$route.path
      );

      this.currentVersion = version;
      this.repository = repositories.find((r) => r.name === repository);
    },
  },
};
</script>
