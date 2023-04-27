import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import { router } from "~/router";

export const deleteTodo = async (id: string, todoId: string, toggleConfirmation: () => void) => {
    const deleteFn = async () => {
        await withTokenInstance.delete(`${PROJECTS_URL + id}/` + `tasks/${todoId}/`);
        router.push(`/projects/${id}`);
    };

    toast.promise(
        deleteFn(),
        {
            pending: "Deleting...",
            success: "The todo has been deleted",
            error: {
                render: (err: any) => {
                    if (err.response?.data.name)
                        return err.response.data.name[0];

                    else return "Something went wrong";
                },
            },
        },

    );
    toggleConfirmation();
};
