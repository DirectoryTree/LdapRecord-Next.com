module.exports = {
  theme: {
    extend: {
      colors: {
        ui: {
          background: "var(--color-ui-background)",
          primary: "var(--color-ui-primary)",
          secondary: "var(--color-ui-secondary)",
          sidebar: "var(--color-ui-sidebar)",
          border: "var(--color-ui-border)",
          shade: "var(--color-ui-shade)",
          typo: "var(--color-ui-typo)",
          light: "var(--color-ui-light)",
        },
      },
      spacing: {
        sm: "24rem",
      },
      screens: {
        xxl: "1400px",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
