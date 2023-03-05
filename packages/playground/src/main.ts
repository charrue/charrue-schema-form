import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import EP from "element-plus";
import "@unocss/reset/tailwind.css";
import "element-plus/theme-chalk/index.css";
// alias
import "~charrue/schema-form-next/index.css";

const app = createApp(App);
app.use(router);
app.use(EP);
app.mount("#app");
