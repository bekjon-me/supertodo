import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import { Ref } from "vue";

export const getProjects = async (projects: Ref<any[]>) => {
    try {
        const response = await withTokenInstance.get(PROJECTS_URL);
        projects.value = response.data;
    }
    catch (error: any) {
        console.log(error);
        if (error.response?.data.name)
            toast.error(error.response.data.name[0]);
    }
};
