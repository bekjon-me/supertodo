<script setup lang="ts">
    import moment from "moment";
    import VueDatePicker from "@vuepic/vue-datepicker";
    import type { Ref } from "vue";
    import { Importance, Status, Todo } from "~/models/todo";
    import { getTodo } from "~/service/get-todo";
    import { deleteTodo } from "~/service/delete-todo";
    import { updateTodo } from "~/service/update-todo";

    const props = defineProps<{ todoId: string; id: string }>();
    const { toggleModal, showModal } = useModal();
    const { showConfirmation, toggleConfirmation } = useConfirmation();
    const { showLoader, toggleLoader } = useLoader();

    const actualTodo = ref<Todo>();

    onMounted(async () => {
        getTodo(actualTodo as Ref<Todo>, props.id as string, props.todoId, toggleLoader);
    });

    const modalTodo = ref();

    const labels = {
        title: "Title",
        description: "Description",
        beginning: "Beginning",
        completion: "Due Date",
        importance: "Importance",
        current_status: "Status",
    };

    const importanceColors = {
        not_important: "bg-green-500 p-2 rounded",
        moderately_important: "bg-yellow-500 p-2 rounded",
        important: "bg-red-500 p-2 rounded",
    };

    const handleEdit = () => {
        modalTodo.value = { ...actualTodo.value };
        toggleModal();
    };

    const deleteFn = () => {
        deleteTodo(props.id as string, props.todoId as string, toggleConfirmation);
    };

    const handleSubmitEdit = () => {
        updateTodo(
            modalTodo.value as Todo,
            actualTodo as Ref<Todo>,
            props.id as string,
            props.todoId as string,
            toggleModal,
        );
    };

    const customPosition = () => ({ top: "100%", left: 0 });
</script>

<template>
    <Header />
    <div v-if="showLoader" class="relative">
        <Loader />
    </div>
    <div v-else class="bg-gray-100 p-8 rounded-md shadow-md dark:bg-gray-800 dark:text-gray-200 relative">
        <h1 class="mb-3 mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {{ actualTodo?.title }}
        </h1>
        <p class="mb-3 text-gray-500 dark:text-gray-400">
            {{ actualTodo?.description }}
        </p>

        <div class="flow-root mb-4">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <div v-for="(value, key) in labels" :key="key">
                    <li v-if="(key !== 'title' && key !== 'description')" class="py-3 sm:py-4">
                        <div>
                            <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-md font-medium text-gray-900 truncate dark:text-white">
                                        {{ value }}
                                    </p>
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                                >
                                    <h2 v-if="key === 'beginning' || key === 'completion'">
                                        {{ moment(actualTodo?.[key]).format('DD-MM-YYYY HH:mm') }}
                                    </h2>
                                    <div
                                        v-else-if="key === 'importance'"
                                        :class="importanceColors[actualTodo?.importance as 'not_important' | 'moderately_important' | 'important']"
                                    >
                                        {{ actualTodo?.[key].split('_').join(' ').toUpperCase() }}
                                    </div>
                                    <h2 v-else>
                                        {{ actualTodo?.[key].split('_').join(' ').toUpperCase() }}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>

        <div class="absolute top-2 right-2 flex flex-col items-center justify-center">
            <span class="text-xs text-gray-500 dark:text-gray-400">
                Created at
                {{ moment(actualTodo?.created).format('DD-MM-YYYY HH:mm') }}
            </span>

            <span class="text-xs text-gray-500 dark:text-gray-400">
                Last updated at
                {{ moment(actualTodo?.updated).format('DD-MM-YYYY HH:mm') }}
            </span>
        </div>
        <div class="absolute bottom-2 left-6 flex gap-4">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="handleEdit"
            >
                Edit
            </button>
            <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="toggleConfirmation"
            >
                Delete
            </button>
        </div>

        <Confirmation v-if="showConfirmation" :cancel-fn="toggleConfirmation" :delete-fn="deleteFn" />

        <Modal v-if="showModal" :toggle-modal="toggleModal">
            <template #form>
                <form class="flex flex-col gap-4" @submit.prevent="handleSubmitEdit">
                    <div v-for="(value, key) in labels" :key="key">
                        <div class="flex flex-col gap-2">
                            <label :for="key">{{ value }}</label>
                            <VueDatePicker
                                v-if="key === 'beginning' || key === 'completion'"
                                id="startDate"
                                v-model="(modalTodo as Todo)[key]"
                                type="date"
                                class="border-none rounded mt-[12px] mb-[12px] text-[#333] w-full"
                                :alt-position="customPosition"
                            />

                            <select
                                v-else-if="key === 'importance'"
                                id="importance"
                                v-model="modalTodo.importance"
                                required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">
                                    Choose a level
                                </option>
                                <option :value="Importance.notImportant">
                                    Not important
                                </option>
                                <option :value="Importance.moderately">
                                    Moderately important
                                </option>
                                <option :value="Importance.important">
                                    Important
                                </option>
                            </select>

                            <select
                                v-else-if="key === 'current_status'"
                                id="status"
                                v-model="modalTodo.current_status"
                                required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">
                                    Choose a status
                                </option>
                                <option :value="Status.queue">
                                    Queue
                                </option>
                                <option :value="Status.development">
                                    Development
                                </option>
                                <option :value="Status.done">
                                    Done
                                </option>
                            </select>

                            <input
                                v-else
                                :id="key"
                                v-model="(modalTodo as Todo)[key]"
                                type="text"
                                class="border border-gray-300 rounded-md p-2 dark:text-gray-200"
                            >
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md">
                            Save
                        </button>
                    </div>
                </form>
            </template>
        </Modal>
    </div>

    <!-- <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 mt-8 md:mt-12 md:mb-6">
        Attached files
    </h2> -->

    <!-- <div
      v-if="files.length > 0"
      class="flex flex-col items-center justify-center w-full h-full md:mx-20 md:text-lg"
    >
      <div
        class="w-96 h-96 relative rounded-md flex justify-center items-center dark:bg-gray-800"
        v-for="file in files"
      >
        <img
          v-if="!loading && file.type === 'image'"
          class="absolute h-full object-cover rounded-md"
          :src="file.value"
          alt="Todo attached img"
        />
        <video v-if="!loading && file.type === 'video'" class="absolute h-full" controls>
          <source :src="file.value" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <AudioPlayer
          v-if="!loading && file.type === 'audio'"
          class="absolute h-full w-full flex justify-center items-center"
          :style="{ width: '100%' }"
          :option="{
            src: file.value,
            title: 'Audio',
            coverImage: doThis
          }"
        />
        <div v-if="loading">
          <FileLoader />
        </div>
      </div>
    </div> -->
</template>
