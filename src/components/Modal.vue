<script setup lang="ts">
    const emit = defineEmits<{
        (event: "toggleModal"): void
    }>();

    const handleToggleModal = () => {
        emit("toggleModal");
    };
</script>

<template>
    <div
        id="add-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-hidden md:inset-0 h-full backdrop-blur-sm flex justify-center"
        @click.self="handleToggleModal"
    >
        <div class="relative w-full h-full max-w-md mt-4 overflow-y-auto scrollbar-hide">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 my-auto mb-4">
                <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    @click="handleToggleModal"
                >
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <slot name="form" />
                    <div class="h-4" />
                </div>
            </div>
        </div>
    </div>
</template>
