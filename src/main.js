import Emitter from "./bus";
import PortalVue from "portal-vue";
import Layout from "~/layouts/App.vue";

export default function (Vue, { router, head }) {
  Vue.use(PortalVue);

  Vue.component("Layout", Layout);

  Vue.prototype.$bus = Emitter;

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: "og:url",
      name: "og:url",
      content: process.env.SITE_URL + to.path,
    });

    next();
  });
}
