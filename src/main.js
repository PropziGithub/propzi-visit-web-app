import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebaseConfig from "./firebase/firebaseConfig";
import firebase from "firebase";

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    user;
    createApp(App)
    .use(router)
    .mount("#app");
  }
});

