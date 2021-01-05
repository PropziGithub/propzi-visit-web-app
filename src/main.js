import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebaseConfig from "./firebase/firebaseConfig";
import firebase from "firebase";

createApp(App)
  .use(router)
  .mount("#app");
