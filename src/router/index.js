import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RoomsView from "../views/RoomsView.vue";

const routes = [
    { path: "/", component: LoginView },
    { path: "/rooms", component: RoomsView },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
