import { defineStore } from "pinia";
import type { User } from "~/models/user";
import { handleGetUser, handleLogin, handleLogout, handleRegister, handleUpdateUser } from "~/service/user-service";

export const useUserStore = defineStore("user", () => {
    const user = ref<User | null>(null);

    const registerUser = async (values: any) => {
        const res = await handleRegister(values);
        const tokens = {
            access: res.data.access,
            refresh: res.data.refresh,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));
        user.value = res.data.user;
        return res;
    };

    const loginUser = async (values: any) => {
        const res = await handleLogin(values);
        const tokens = {
            access: res.data.access,
            refresh: res.data.refresh,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));
        user.value = res.data.user;
        return res;
    };

    const logoutUser = async () => {
        await handleLogout();
        user.value = null;
        localStorage.removeItem("tokens");
    };

    const getUser = async () => {
        const res = await handleGetUser();
        user.value = res.data;
    };

    const updateUser = async (modalUser: User) => {
        const res = await handleUpdateUser(modalUser);
        user.value = res.data;
    };

    return {
        user,
        registerUser,
        loginUser,
        logoutUser,
        getUser,
        updateUser,
    };
});
