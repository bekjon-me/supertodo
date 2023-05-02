import { defineStore } from "pinia";
import type { User } from "~/models/user";
import { logout } from "~/service/logout";

export const useUserStore = defineStore("user", () => {
    const router = useRouter();
    const user = ref<User | null>(null);

    const createUser = (createdUser: User) => {
        user.value = createdUser;
    };

    const logoutUser = () => {
        logout();
        user.value = null;
        localStorage.removeItem("tokens");
        router.push("/login");
    };

    return {
        user,
        createUser,
        logoutUser,
    };
});
