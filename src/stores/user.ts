import { defineStore } from "pinia";
import type { User } from "~/models/user";
import { handleLogin, logout } from "~/service/user-service";

export const useUserStore = defineStore("user", () => {
    const router = useRouter();
    const user = ref<User | null>(null);

    const logoutUser = () => {
        logout();
        user.value = null;
        localStorage.removeItem("tokens");
        router.push("/login");
    };

    const loginUser = async (values: any) => {
        const res = await handleLogin(values);
        if (res.data) {
            const tokens = {
                access: res.data.access_token,
                refresh: res.data.refresh_token,
            };
            localStorage.setItem("tokens", JSON.stringify(tokens));
            user.value = res.data.user;
        }
    };

    return {
        user,
        logoutUser,
        loginUser,
    };
});
