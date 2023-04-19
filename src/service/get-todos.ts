import { toast } from "vue3-toastify";
import type { Ref } from "vue";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import { Todo } from "~/models/todo";

export const getTodos = async (todos: Ref<Todo[]>, id: string | string[], toggleLoader: () => void) => {

    try {
        toggleLoader();
        const response = await withTokenInstance.get(PROJECTS_URL + id + "/tasks/");
        todos.value = response.data;
    }
    catch (error: any) {
        console.log(error);
        if (error.response?.data.name)
            toast.error(error.response.data.name[0]);
    } finally {
        toggleLoader();
    }
};
