import type { Ref } from "vue";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import type { Todo } from "~/models/todo";

export const getTodo = async (actualTodo: Ref<Todo>, id: string, todoId: string, toggleLoader: () => void) => {
    try {
        toggleLoader();
        const response = await withTokenInstance.get(`${PROJECTS_URL + id}/tasks/${todoId}/`);
        actualTodo.value = response.data;
    }
    catch (error: any) {
        if (error?.response?.status === 404)
            // router.push(id as string);
            return;
    }
    finally {
        toggleLoader();
    }
};
