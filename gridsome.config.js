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
    repositories: [
      {
        name: "core",
        url: "https://github.com/DirectoryTree/LdapRecord",
        versions: [
          {
            name: "v1.x",
            slug: "v1",
            uri: "/docs/core/v1",
          },
          {
            name: "v2.x",
            slug: "v2",
            uri: "/docs/core/v2",
          },
        ],
      },
      {
        name: "laravel",
        url: "https://github.com/DirectoryTree/LdapRecord-Laravel",
        versions: [
          {
            name: "v1.x",
            slug: "v1",
            uri: "/docs/laravel/v1",
          },
          {
            name: "v2.x",
            slug: "v2",
            uri: "/docs/laravel/v2",
          },
        ],
      },
    ],
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "./content/docs",
        path: "*/**/*.md",
        pathPrefix: "/docs",
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
