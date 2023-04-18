import { toast } from "vue3-toastify";
import { useUserStore } from "../stores/user";
import { nonTokenInstance } from "./axios";
import { AUTH_USER_URL } from "./urls";

interface Payload {
    username: string
    email: string
    password1: string
    password2: string
}

export const handleRegister = async (values: Payload) => {
    const { createUser } = useUserStore();

    const registerFN = async () => {
        const res = await nonTokenInstance.post(AUTH_USER_URL, values);
        const tokens = {
            access: res.data.access_token,
            refresh: res.data.refresh_token,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));
        createUser(res.data.user);
    };

    try {
        toast.promise(
            registerFN(),
            {
                pending: "Logging in...",
                success: "You have successfully logged in",
                error: "Something went wrong",
            },
        );
    }
    catch (error: any) {
        console.log(error);
        if (error.response?.data.username)
            toast.error(error.response.data.username[0]);

        if (error.response?.data.email)
            toast.error(error.response.data.email[0]);

        if (error.response?.data.password1)
            toast.error(error.response.data.password1[0]);

        if (error.response?.data.non_field_errors)
            toast.error(error.response.data.non_field_errors[0]);
    }
};
