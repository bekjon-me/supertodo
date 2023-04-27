import { toast } from "vue3-toastify";
import { useUserStore } from "../stores/user";
import { nonTokenInstance } from "./axios";
import { LOGIN_USER_URL } from "./urls";
import { router } from "~/router";

export const handleLogin = async (values: any) => {
    const { createUser } = useUserStore();

    const loginFN = async () => {
        const res = await nonTokenInstance.post(LOGIN_USER_URL, values);
        console.log(res.data);
        const tokens = {
            access: res.data.access_token,
            refresh: res.data.refresh_token,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));
        createUser(res.data.user);
        router.push("/");
    };

        toast.promise(
            loginFN(),
            {
                pending: "Logging in...",
                success: "You have successfully logged in",
                error: {
                    render: (error: any) => {
                        console.log(error);
                        
                        if (error.response?.data.email)
                            return error.response.data.email[0];

                        if (error.response?.data.password)
                            return error.response.data.password[0];

                        if (error.response?.data.non_field_errors)
                            return error.response.data.non_field_errors[0];

                        else return "Something went wrong";
                    }
            }
        });
};
