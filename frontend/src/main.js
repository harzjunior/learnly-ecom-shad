// frontend/src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/index.css";
import { Toaster } from "@/components/ui/sonner";

createApp(App).use(router).use(store).use(Toaster).mount("#app");
