import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import CharrueSchemaForm from "@charrue/schema-form-next";

const app = createApp(App);

app.use(ElementPlus);
app.use(CharrueSchemaForm);
app.use(router);

app.mount("#app");
