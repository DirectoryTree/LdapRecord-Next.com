<static-query>
query {
 	metadata {
    settings {
      repositories {
        name
        url
        versions {
          name
          slug
          uri
        }
      }
    }
  } 
}
</static-query>

<script>
export default {
  data() {
    return {
      repository: null,
      currentVersion: null,
    };
  },

  computed: {
    repositories() {
      return this.$static.metadata.settings.repositories;
    },
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
      getLatestVersion: this.getLatestVersion,
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
      this.repository = this.repositories.find((r) => r.name === repository);
    },

    getLatestVersion(repositoryName) {
        const repository = this.repositories.find(({ name }) => repositoryName === name);

        if (! repository) {
          return;
        }

        return repository.versions[repository.versions.length - 1];
    },
  },
};
</script>
