<script lang="ts" setup>
    import { ToastifyContainer } from "vue3-toastify";
</script>

<template>
    <main class="px-4 py-4 text-gray-700 dark:text-gray-200">
        <Header />
        <RouterView />
        <ToastifyContainer />
    </main>
</template>
