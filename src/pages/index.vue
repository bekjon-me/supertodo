<script setup lang="ts">
    import type { Project } from "~/models/project";
    import { addProject } from "~/service/add-project";
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
        addProject(modal.value.projectName, projects, toggleModal);
    };

    onMounted(async () => {
        getProjects(projects, toggleLoader);
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
    <Header />
    <Button class="bg-[green] py-[12px] px-[24px] rounded w-[100%] text-white" @click="toggleModal">
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

    <Modal v-if="showModal" :toggle-modal="toggleModal">
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
                <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {{ t('button.add') }}
                </button>
            </form>
        </template>
    </Modal>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
