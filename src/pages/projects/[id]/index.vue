<script setup lang="ts">
    import VueDatePicker from "@vuepic/vue-datepicker";
    import { toast } from "vue3-toastify";
    import type { Todo } from "~/models/todo";
    import { Importance, Status } from "~/models/todo";
    import { addTodo, getTodos } from "~/service/todos-service";

    const props = defineProps<{ id: string }>();

    const { showLoader, toggleLoader } = useLoader();

    const { showModal, toggleModal } = useModal();

    const newTodo = ref({
        title: "",
        description: "",
        beginning: new Date(),
        completion: new Date(),
        importance: "",
        current_status: "",
    });

    const todos = ref<Todo[]>([]);

    onMounted(async () => {
        try {
            toggleLoader();
            todos.value = await getTodos(props.id);
        }
        catch (error: any) {
            if (error.response?.data.name)
                toast.error(error.response.data.name[0]);
        }
        finally {
            toggleLoader();
        }
    });

    const handleAddTodo = () => {
        if (newTodo.value.beginning >= newTodo.value.completion) {
            toast.error("The beginning date must be earlier than the completion date");
            return;
        }

        if (todos.value.find(todo => todo.title === newTodo.value.title)) {
            toast.error("The task with this name already exists");
            return;
        }
        toast.promise(addTodo(newTodo, props.id, todos), {
            pending: "Creating task...",
            success: "Created successfully",
            error: {
                render: (err: any) => {
                    if (err.response?.data.name)
                        return err.response.data.name[0];

                    if (err.response?.data.beginning)
                        return err.response.data.beginning[0];

                    if (err.response?.data.importance)
                        return err.response.data.importance[0];

                    else return "Something went wrong";
                },

            },
        }, {
            autoClose: 3000,
            closeButton: true,
        });
        newTodo.value = {
            title: "",
            description: "",
            beginning: new Date(),
            completion: new Date(),
            importance: "",
            current_status: "",
        };
        toggleModal();
    };
</script>

<template>
    <Button color="green" @click="toggleModal">
        Add task
    </Button>
    <Modal v-if="showModal" @toggle-modal="toggleModal">
        <template #form>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add a new task
            </h3>
            <form class="space-y-3" @submit.prevent="handleAddTodo">
                <label
                    for="projectName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name of the task</label>
                <input
                    id="projectName"
                    v-model.trim="newTodo.title"
                    type="text"
                    name="projectName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Add a name"
                    required
                >
                <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description of the task</label>
                <input
                    id="description"
                    v-model.trim="newTodo.description"
                    type="text"
                    name="description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Description"
                    required
                >
                <div class="flex flex-col gap-x-4 justify-around mt-2">
                    <h2 class="block mb-2 text-sm font-medium text-red-700">
                        The start date must be before the end date
                    </h2>
                    <div>
                        <label
                            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                            for="startDate"
                        >
                            Start date
                        </label>
                        <VueDatePicker
                            id="startDate"
                            v-model="newTodo.beginning"
                            type="date"
                            class="border-none rounded mt-[12px] mb-[12px] text-[#333] w-full"
                            :teleport-center="true"
                        />
                    </div>
                    <div>
                        <label
                            class="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                            for="endDate"
                        >
                            End date
                        </label>
                        <VueDatePicker
                            id="endDate"
                            v-model="newTodo.completion"
                            type="date"
                            class="border-none rounded mt-[12px] mb-[12px] text-[#333] w-full"
                            :teleport-center="true"
                        />
                    </div>
                </div>
                <label
                    for="importance"
                    class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Level of importance</label>
                <select
                    id="importance"
                    v-model="newTodo.importance"
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

                <label
                    for="status"
                    class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Current status</label>
                <select
                    id="status"
                    v-model="newTodo.current_status"
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
                <Button
                    type="submit"
                    color="green"
                >
                    Add
                </Button>
            </form>
        </template>
    </Modal>

    <div class="mt-2 text-[30px] text-[#333] border-b-2 dark:text-white">
        Tasks
    </div>
    <div class="mt-2">
        <div v-if="todos.length > 0" class="flex flex-wrap gap-4 justify-around">
            <div v-for="todo in todos" :key="todo.ptid">
                <TodoCard :todo="todo" />
            </div>
        </div>
        <div v-else class="relative w-full">
            <Loader v-if="showLoader" />
            <h1 v-else class="text-[#333] text-[20px] dark:text-gray-200">
                No todos yet
            </h1>
        </div>
    </div>
</template>
