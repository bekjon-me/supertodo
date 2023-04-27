<script setup lang="ts">
    const props = defineProps<
{
    deleteFn: () => void
    cancelFn: () => void
    }>();

    const handleDelete = () => {
        console.log("do");
        props.deleteFn();
    };

    const handleCancel = () => {
        console.log("cancel");
        props.cancelFn();
    };
</script>

<template>
    <div
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-hidden md:inset-0 h-full mb backdrop-blur-sm flex flex-col items-center justify-center"
        @click.self="handleCancel"
    >
        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Are you sure?
        </h2>
        <div class="flex justify-center items-center gap-4">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 w-20"
                @click="handleDelete"
            >
                Yes
            </button>
            <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-10 w-20"
                @click="handleCancel"
            >
                No
            </button>
        </div>
    </div>
</template>
