<script setup lang="ts">
    import { addProject } from "~/service/add-project";
    import { getProjects } from "~/service/get-projects";
    const { t } = useI18n();
    const { showModal, toggleModal } = useModal();
    const modal = ref({
        projectName: "",
    });

    const projects = ref<any>([]);

    const handleAddProject = () => {
        addProject(modal.value.projectName, projects, toggleModal);
        console.log("add project");
    };

    onMounted(async () => {
        getProjects(projects);
    })
</script>

<template>
    <Header />
    <Button class="bg-[green] py-[12px] px-[24px] rounded w-[100%] text-white" @click="toggleModal">
        {{ t('button.add') }}
    </Button>
    <h1 class="mt-2 text-[30px] border-b-2">
        {{ t('headings.projects') }}
    </h1>
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

    <div class="flex flex-wrap gap-4 justify-around mt-2">
        <div v-for="project in projects" v-if="projects.length > 0">
            <ProjectCard :project="project" />
        </div>
        <div v-else>
            <h1 class="text-[#333] text-[20px] dark:text-gray-200">
                No projects yet
            </h1>
        </div>
    </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
