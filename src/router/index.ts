import type { RouteRecordRaw, Router } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { withTokenInstance } from "~/service/axios";

for (const route of generatedRoutes) {
    route.beforeEnter = async (to, from, next) => {       
        let isAuthenticated = false;
        if (localStorage.getItem("tokens")) {
            try {
                await withTokenInstance.post("api/auth/token/verify/", {
                    token: JSON.parse(localStorage.getItem("tokens") || "{}").access,
                });
                isAuthenticated = true;
            }
            catch (error) {
                console.log(error);
                isAuthenticated = false;
            }
        }
        else {
            isAuthenticated = false;
        }

        if (isAuthenticated) {
            if (route.path === "/login" || route.path === "/register")
                next("/");
            else
                next();
        }
        else {
            if (route.path === "/" || route.path === "/projects/:id" || route.path === "/projects/:id/todos/:todoId" || route.path === "/profile")
                next("/login");
            else
                next();
        }
    };
}

let router: Router

export function setRouter(r: Router): void {
  router = r
}

export const routes: RouteRecordRaw[] = setupLayouts(generatedRoutes);   

export { router }
