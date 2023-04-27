import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import { LOGOUT_USER_URL } from "./urls";
import { router } from "~/router";

export const logout = async () => {
    const logoutFN = async () => {
        await withTokenInstance.post(LOGOUT_USER_URL);
        localStorage.removeItem("tokens");
        router.push("/login");
    };

    toast.promise(logoutFN(), {
        pending: "Logging out...",
        success: "User has been logged out",
        error: {
            render: (error: any) => {
                console.log(error);
                return "Something went wrong";
            }
        },
    });
    
};
