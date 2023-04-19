<script setup lang="ts">
    import axios from "axios";
    import moment from "moment";
    import type { Project } from "~/models/project";
    import thinkHappy from "~/assets/thinkHappy.jpg";
    import { deleteProject } from "~/service/delete-project";
    import { updateProject } from "~/service/update-project";

    const props = defineProps<{
        project: Project
        removeDeleted: (id:number) => void
        setProjectName: (name: string) => void
        editProject: (id: number, name:string) => void
    }>();
    const {showModal, toggleModal} = useModal();
    
    interface Quote {
        content: string
        author?: string
    }

    const loading = ref(false);
    const quote = ref<Quote>({
        content: "",
        author: "",
    });
    const changingName = ref('');
    const {showConfirmation, toggleConfirmation} = useConfirmation()

    onMounted(async () => {
        try {
            loading.value = true;
            const res = await axios.get("https://api.quotable.io/random");
            quote.value = res.data;
        }
        catch (error) {
            // console.log(error);
        }
        finally {
            loading.value = false;
        }
    });

    const deleteFn = () => {
        deleteProject(props.project.upid, toggleConfirmation, props.removeDeleted)
    }

    const openModal = () => {
        props.setProjectName(props.project.name)
        changingName.value = props.project.name
        toggleModal()
    }

    const handleEdit = () => {
        updateProject(props.project.upid, changingName.value, toggleModal, props.editProject)
    }

</script>

<template>
    <div
        class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="w-96 h-96 bg-center relative rounded-md">
            <img class="absolute top-0 h-full w-full rounded-md" :src="thinkHappy" alt="Think happy">
            <div class="absolute w-full h-full bg-[#000000c2] rounded-md text-white p-6">
                <h2 class="text-lg font-poppins">
                    {{ quote.content }}
                </h2>
                <h5 class="text-4xl font-dancing text-center">
                    {{ quote.author }}
                </h5>
                <div class="absolute bottom-2 right-6 flex flex-col items-center justify-center">
                    <span class="text-xs text-gray-300 dark:text-gray-200">
                        Created at
                        {{ moment(project?.created).format('DD-MM-YYYY HH:mm') }}
                    </span>

                    <span class="text-xs text-gray-300 dark:text-gray-200">
                        Last updated at
                        {{ moment(project?.updated).format('DD-MM-YYYY HH:mm') }}
                    </span>
                </div>
            </div>
        </div>
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ project.name }}
            </h5>
            <RouterLink
                :to="`/projects/${project.upid}`"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Let's check it out
                <svg
                    aria-hidden="true"
                    class="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </RouterLink>
        </div>
        <div class="absolute bottom-5 right-5 flex gap-2">
            <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="toggleConfirmation"
            >
                Delete
            </button>

            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="openModal"
            >
                Edit
            </button>
        </div>
    </div>

    <Confirmation v-if="showConfirmation" :delete-fn="deleteFn" :cancel-fn="toggleConfirmation" />
    <Modal :toggle-modal="toggleModal" v-if="showModal">
      <template #form>
        <form class="flex flex-col gap-4" @submit.prevent="handleEdit">
          <div class="flex flex-col gap-2">
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              :id="project.created"
              class="border border-gray-900 rounded-md p-2 dark:text-gray-200"
              v-model.trim="changingName"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </template>
    </Modal>
</template>
