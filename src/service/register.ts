import { toast } from "vue3-toastify";
import { useUserStore } from "../stores/user";
import { nonTokenInstance } from "./axios";
import { AUTH_USER_URL } from "./urls";
import { router } from "~/router";

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
        router.push("/");
    };

    toast.promise(
        registerFN(),
        {
            pending: "Logging in...",
            success: "You have successfully logged in",
            error: {
                render: (error: any) => {
                    if (error.response?.data.username)
                        return error.response.data.username[0];

                    if (error.response?.data.email)
                        return error.response.data.email[0];

                    if (error.response?.data.password1)
                        return error.response.data.password1[0];

                    if (error.response?.data.non_field_errors)
                        return error.response.data.non_field_errors[0];

                    else return "Something went wrong";
                },
            },
        },{
            autoClose: 3000,
            closeButton: true,
        });
};
