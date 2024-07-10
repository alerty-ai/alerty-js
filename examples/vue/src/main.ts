import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import * as Alerty from "@alerty/vue";

Alerty.configure({
  dsn: "__YOUR_DSN__",
});

createApp(App).mount("#app");
