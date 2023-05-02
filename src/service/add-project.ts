import type { Ref } from "vue";
import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";

export const addProject = async (name: string, projects: Ref<any[]>, toggleModal: () => void) => {
    if (projects.value.find(project => project.name === name)) {
        toast.error("The project with this name already exists");
        return;
    }

    const addFN = async () => {
        const response = await withTokenInstance.post(PROJECTS_URL, { name });
        projects.value.push(response.data);
    };

    toast.promise(addFN(), {
        pending: "Creating project...",
        success: "The Project has been created",
        error: {
            render: (err: any) => {
                if (err.response?.data.name)
                    return err.response.data.name[0];

                else return "Something went wrong";
            },
        },
    }, {
        autoClose: 3000,
        closeButton: true,
    });
    toggleModal();
};
