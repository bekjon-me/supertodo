<script setup lang="ts">
    import { ArrowRightOnRectangleIcon } from "@heroicons/vue/20/solid";
    import { toast } from "vue3-toastify";
    import { useUserStore } from "~/stores/user";

    const router = useRouter();
    const { logoutUser } = useUserStore();
    const showDropdown = ref(false);
    const dropdown = ref();
    const isUserLoggedIn = computed(() => {
        return !!localStorage.getItem("tokens");
    });

    function handleClickOutside(event: Event) {
        if (dropdown.value && !dropdown.value.contains(event.target as HTMLElement))
            toggleDropdown();
    }

    function toggleDropdown() {
        showDropdown.value = !showDropdown.value;
        if (showDropdown.value)
            document.addEventListener("click", handleClickOutside);
        else
            document.removeEventListener("click", handleClickOutside);
    }

    const handleLogout = async () => {
        toast.promise(logoutUser(), {
            pending: "Logging out...",
            success: {
                render: () => {
                    router.push("/login");
                    return "Logged out successfully";
                },
            },
            error: {
                render: () => {
                    return "Something went wrong";
                },
            },
        }, {
            autoClose: 3000,
            closeButton: true,
        });
    };

    onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
    });
</script>

<template>
    <div v-if="isUserLoggedIn" ref="dropdown" class="relative">
        <img
            src="../assets/user.jpg"
            alt="User"
            class="w-[60px] rounded-full cursor-pointer"
            @click="toggleDropdown"
        >
        <div
            v-if="showDropdown"
            id="dropdown"
            class="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
            <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
            >
                <li @click="toggleDropdown">
                    <RouterLink
                        to="/profile"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Profile
                    </RouterLink>
                </li>
                <li
                    class="bg-red-600 hover:bg-red-500 flex items-center text-white cursor-pointer"
                    @click="handleLogout"
                >
                    <a href="#" class="block px-4 py-2 dark:hover:text-white">Sign out</a>
                    <ArrowRightOnRectangleIcon class="w-5 h-5" />
                </li>
            </ul>
        </div>
    </div>
</template>
