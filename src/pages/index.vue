<script setup lang="ts">
    import { toast } from "vue3-toastify";
    import type { Project } from "~/models/project";
    import { addProject } from "~/service/projects-service";
    import { getProjects } from "~/service/get-projects";

    const { showLoader, toggleLoader } = useLoader();
    const { t } = useI18n();
    const { showModal, toggleModal } = useModal();
    const modal = ref({
        projectName: "",
    });

    const setProjectName = (name: string) => {
        modal.value.projectName = name;
    };

    const projects = ref<Project[]>([]);

    const handleAddProject = () => {
        if (projects.value.find(project => project.name === modal.value.projectName)) {
            toast.error("The project with this name already exists");
            return;
        }
        toast.promise(addProject(modal.value.projectName, projects), {
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

    onMounted(async () => {
        await getProjects(projects, toggleLoader);
    });

    const removeDeleted = (id: number) => {
        projects.value = projects.value.filter(project => project.upid !== id);
    };

    const editProject = (id: number, updatedProject: Project) => {
        projects.value = projects.value.map((project) => {
            if (project.upid === id)
                project = updatedProject;

            return project;
        });
    };
</script>

<template>
    <Button color="green" @click="toggleModal">
        {{ t('button.add') }}
    </Button>
    <h1 class="mt-2 text-[30px] border-b-2">
        {{ t('headings.projects') }}
    </h1>
    <div v-if="projects?.length > 0" class="flex flex-wrap gap-4 justify-around mt-2">
        <div v-for="project in projects" :key="project.upid">
            <ProjectCard :set-project-name="setProjectName" :project="project" :remove-deleted="removeDeleted" :edit-project="editProject" />
        </div>
    </div>
    <div v-else class="relative">
        <Loader v-if="showLoader" />
        <h1 v-else class="text-[#333] text-[20px] dark:text-gray-200">
            No projects yet
        </h1>
    </div>

    <Modal v-if="showModal" @toggle-modal="toggleModal">
        <template #form>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {{ t('headings.addNewProject') }}
            </h3>
            <form class="space-y-3" @submit.prevent="handleAddProject">
                <label
                    for="projectName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >{{
                    t('headings.nameOfProject') }}
                </label>
                <input
                    id="projectName"
                    v-model.trim="modal.projectName"
                    type="text"
                    name="projectName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Add a name"
                    required
                >
                <Button
                    type="submit"
                    color="green"
                >
                    {{ t('button.add') }}
                </Button>
            </form>
        </template>
    </Modal>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
