import type { Ref } from "vue";
import { withTokenInstance } from "./axios";
import { USER_URL } from "./urls";
import type { User } from "~/models/user";

export const getUser = async (user: Ref<User>, toggleLoader: () => void) => {
    try {
        toggleLoader();
        const response = await withTokenInstance.get(USER_URL);
        user.value = response.data;
    }
    catch (error: any) {
        return error;
    }
    finally {
        toggleLoader();
    }
};
