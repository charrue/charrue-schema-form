import { createApp } from "vue";
import App from "./App.vue";
import "@unocss/reset/tailwind.css";
import EP from "element-plus";
import "element-plus/theme-chalk/index.css";
// alias
import "~charrue/schema-form-next/index.css";

const app = createApp(App);
app.use(EP);
app.mount("#app");
