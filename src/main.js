import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import Data from "./Data";

const app = createApp(App);

app.use(router);
app.provide("$data", Data);

app.mount("#app");
