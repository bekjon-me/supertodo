import { toast } from "vue3-toastify";
import { nonTokenInstance, withTokenInstance } from "./axios";
import { LOGIN_USER_URL, LOGOUT_USER_URL } from "./urls";

export const handleLogin = async (values: any): Promise<any> => {
    try {
        const res = await nonTokenInstance.post(LOGIN_USER_URL, values);
        return res;
    }
    catch (error) {
        return error;
    }
};

export const logout = async () => {
    const logoutFN = async () => {
        await withTokenInstance.post(LOGOUT_USER_URL);
        localStorage.removeItem("tokens");
        // router.push("/login");
    };

    toast.promise(logoutFN(), {
        pending: "Logging out...",
        success: "User has been logged out",
        error: {
            render: () => {
                return "Something went wrong";
            },
        },
    }, {
        autoClose: 3000,
        closeButton: true,
    });
};
