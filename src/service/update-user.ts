import { toast } from "vue3-toastify";
import type { Ref } from "vue";
import { withTokenInstance } from "./axios";
import { USER_URL } from "./urls";
import type { User } from "~/models/user";

export const updateUser = async (modalUser: User, user: Ref<User>, toggleModal: () => void) => {
    const updateFN = async () => {
        const res = await withTokenInstance.patch(USER_URL, modalUser);
        user.value = res.data;
    };

    toast.promise(updateFN(), {
        pending: "Updating...",
        success: "User has been updated",
        error: {
            render: (err: any) => {
                if (err.response?.data.details)
                    return err.response.data.details[0];

                else return "Something went wrong";
            },

        },
    },{
        autoClose: 1000,
        closeButton: true,
    });
    toggleModal();
};
