import "./styles/tailwind.css";
// import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/app/router";
import { createAppPinia } from "@/app/providers/pinia";

createApp(App).use(createAppPinia()).use(router).mount("#app");
