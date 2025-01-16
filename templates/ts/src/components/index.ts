import { App } from "vue";

export default {
  install: (app: App) => {
    // app.component("name", () => import("..."));
    console.log("install", app);
  },
};
