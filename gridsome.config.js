module.exports = {
  siteName: "LdapRecord",
  icon: {
    favicon: "./src/assets/logo-icon.svg",
    touchicon: "./src/assets/logo-icon.svg",
  },
  siteUrl: process.env.SITE_URL
    ? process.env.SITE_URL
    : "https://ldaprecord.com",
  settings: {
    sidebars: [
      {
        name: "core",
        versions: [
          {
            name: "v1",
            sections: require("./src/sidebars/core/v1/sidebar.json"),
          },
          {
            name: "v2",
            sections: require("./src/sidebars/core/v2/sidebar.json"),
          },
        ],
      },
      {
        name: "laravel",
        versions: [
          {
            name: "v1",
            sections: require("./src/sidebars/laravel/v1/sidebar.json"),
          },
          {
            name: "v2",
            sections: require("./src/sidebars/laravel/v2/sidebar.json"),
          },
        ],
      },
    ],
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "./content",
        path: "**/*.md",
        typeName: "MarkdownPage",
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["noopener", "noreferrer"],
          plugins: ["@gridsome/remark-prismjs"],
        },
      },
    },
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./tailwind.config.js",
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [/token$/],
        },
      },
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: process.env.GA_ID ? process.env.GA_ID : "XX-999999999-9",
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {},
    },
  ],
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
};
