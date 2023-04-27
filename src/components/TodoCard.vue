<script setup lang="ts">
    import randomImage from "~/assets/motivationalImages";
    import type { Todo } from "~/models/todo";

    const props = defineProps<{
        todo: Todo
    }>();
    const { id } = useRouter().currentRoute.value.params;
    const image = ref();

    onMounted(async () => {
        image.value = randomImage();
    });

    const color = computed(() => {
        if (props.todo.importance === "important")
            return "bg-red-500";
        else if (props.todo.importance === "moderately_important")
            return "bg-yellow-500";
        else
            return "bg-green-500";
    });
</script>

<template>
    <div class="max-w-sm border border-gray-200 shadow dark:border-gray-700 h-full flex flex-col">
        <div class="w-96 h-96 relative flex justify-center items-center dark:bg-gray-800">
            <img class="absolute h-full object-cover" :src="image" alt="Todo Card image">
        </div>
        <div class="p-5 flex-1 relative pb-8" :class="[color]">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ todo.title }}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-200">
                {{
                    todo.description?.length > 300
                        ? `${todo.description.substring(0, 300)}...`
                        : todo.description
                }}
            </p>
            <RouterLink
                :to="`/projects/${id}/todos/${todo.ptid}`"
                class="absolute bottom-2 left-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </div>
</template>
