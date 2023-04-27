import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import type { Project } from "~/models/project";

export const updateProject = async (id: number, name: string, toggleModal: () => void, editLocal: (id: number, project: Project) => void) => {
    const updateFN = async () => {
        const res = await withTokenInstance.patch(`${PROJECTS_URL + id}/`, { name });
        editLocal(id, res.data);
    };

    toast.promise(updateFN(), {
        pending: "Updating...",
        success: "The project has been updated",
        error: {
            render: (err: any) => {
                if (err.response?.data.name)
                    return err.response.data.name[0];

                else return "Something went wrong";
            },
        },
    });
    toggleModal();
};
