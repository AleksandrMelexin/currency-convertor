import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("@/pages/main-page.vue"),
        },
        {
            path: "/history",
            component: () => import("@/pages/history-page.vue"),
        },
    ],
});

export default router;