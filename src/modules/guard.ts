import { withTokenInstance } from "~/service/axios";
import { type UserModule } from "~/types";

export const install: UserModule = ({ isClient, router }) => {
    if (isClient) {
        router.beforeEach(async (to, from, next) => {
            let isAuthenticated = false;
            const token = JSON.parse(localStorage.getItem("tokens") || "{}").access;
            if (localStorage.getItem("tokens")) {
                try {
                    await withTokenInstance.post("api/auth/token/verify/", {
                        token,
                    });
                    isAuthenticated = true;
                }
                catch (error) {
                    isAuthenticated = false;
                }
            }

            else {
                isAuthenticated = false;
            }

            if (isAuthenticated) {
                if (to.name === "login" || to.name === "register")
                    next("/");
                else
                    next();
            }
            else {
                if (to.name === "index" || to.name === "projects-id" || to.name === "projects-id-todos-todoId" || to.name === "profile")
                    next("/login");
                else
                    next();
            }
        });
    }
};
