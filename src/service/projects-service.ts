import type { Ref } from "vue";
import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import type { Project } from "~/models/project";

export const addProject = async (name: string, projects: Ref<Project[]>) => {
    const res = await withTokenInstance.post(PROJECTS_URL, { name });
    projects.value.push(res.data);
};

export const deleteProject = async (id: number) => {
    await withTokenInstance.delete(`${PROJECTS_URL + id}/`);
};
export const updateProject = async (id: number, name: string, editProject: (id: number, project: Project) => void) => {
    const res = await withTokenInstance.patch(`${PROJECTS_URL + id}/`, { name });
    editProject(id, res.data);
};

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
