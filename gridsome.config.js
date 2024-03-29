const tailwind = require("tailwindcss");

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
    docsUrl: "https://github.com/DirectoryTree/LdapRecord-Docs/blob/master",
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
          {
            name: "v3",
            sections: require("./src/sidebars/core/v3/sidebar.json"),
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
          {
            name: "v3",
            sections: require("./src/sidebars/laravel/v3/sidebar.json"),
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
            slug: "v1",
            name: "v1.x",
            uri: "/docs/core/v1",
          },
          {
            slug: "v2",
            name: "v2.x",
            uri: "/docs/core/v2",
          },
          {
            slug: "v3",
            name: "v3.x",
            uri: "/docs/core/v3",
          },
        ],
      },
      {
        name: "laravel",
        url: "https://github.com/DirectoryTree/LdapRecord-Laravel",
        versions: [
          {
            slug: "v1",
            name: "v1.x",
            uri: "/docs/laravel/v1",
          },
          {
            slug: "v2",
            name: "v2.x",
            uri: "/docs/laravel/v2",
          },
          {
            slug: "v3",
            name: "v3.x",
            uri: "/docs/laravel/v3",
          },
        ],
      },
    ],
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "./docs",
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
  css: {
    loaderOptions: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
};
