import { toast } from "vue3-toastify";
import type { Ref } from "vue";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import type { Project } from "~/models/project";

export const getProjects = async (projects: Ref<Project[]>, toggleLoader: () => void) => {
    try {
        toggleLoader();
        const response = await withTokenInstance.get(PROJECTS_URL);
        projects.value = response.data;
    }
    catch (error: any) {
        if (error.response?.data.name)
            toast.error(error.response.data.name[0]);
    }
    finally {
        toggleLoader();
    }
};
