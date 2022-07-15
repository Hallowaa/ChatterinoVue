import { createRouter, createWebHistory } from "vue-router";
import Login from "/src/components/login/LoginView.vue";
import Mainchat from "/src/components/mainchat/MainchatView.vue";
import Error from "/src/components/error/ErrorView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/mainchat",
      name: "mainchat",
      component: Mainchat
    },
    {
      path: "/error",
      name: "error",
      component: Error
    }
  ]
});

export default router;
