<script setup lang="ts">
    const props = defineProps<{
        color?: string
    }>();
    const emit = defineEmits(["click"]);
    function onClick() {
        emit("click");
    }

    const btnClass = computed(() => {
        if (props.color === "green")
            return "group relative flex w-full justify-center rounded-md bg-green-600 py-3 px-3 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600";
        else if (props.color === "red")
            return "group relative flex w-full justify-center rounded-md bg-red-600 py-3 px-3 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";
        else if (props.color === "blue")
            return "group relative flex w-full justify-center rounded-md bg-indigo-600 py-3 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        else
            return "bg-[#333] py-[12px] px-[24px] rounded w-[100%] text-white text";
    });
</script>

<template>
    <button :class="btnClass" @click="onClick">
        <slot />
    </button>
</template>
