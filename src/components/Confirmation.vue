<script setup lang="ts">
    const emit = defineEmits<{
        (event: "deleteFn"): void
        (event: "cancelFn"): void
    }>();

    const handleDelete = () => {
        emit("deleteFn");
    };

    const handleCancel = () => {
        emit("cancelFn");
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
            <Button
                color="red"
                @click="handleDelete"
            >
                Yes
            </Button>
            <Button
                color="blue"
                @click="handleCancel"
            >
                No
            </Button>
        </div>
    </div>
</template>
