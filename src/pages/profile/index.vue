<script setup lang="ts">
    import { toast } from "vue3-toastify";
    import userImg from "~/assets/user.jpg";
    import { useUserStore } from "~/stores/user";
    import { User } from "~/models/user";

    const { getUser, updateUser } = useUserStore();
    const { user } = toRefs(useUserStore());
    const { showModal, toggleModal } = useModal();
    const { showLoader, toggleLoader } = useLoader();
    const modalUser = ref();

    onMounted(async () => {
        try {
            toggleLoader();
            await getUser();
        }
        catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            toggleLoader();
        }
    });
    const labels = {
        first_name: "First name",
        last_name: "Last name",
        username: "Username",
        email: "Email",
    };

    const handleChange = (e: any, key: string) => {
        modalUser.value = {
            ...modalUser.value,
            [key]: e.target.value,
        };
    };

    const handleSubmit = () => {
        if (!modalUser.value || toRaw(modalUser.value) === toRaw(user.value)) {
            toggleModal();
            return;
        }

        toast.promise(updateUser(modalUser.value), {
            pending: "Updating...",
            success: {
                render: () => {
                    return "User has been updated";
                },
            },
            error: {
                render: (error: any) => {
                    const errors = error.data.response.data;
                    if (errors.details)
                        return errors.details;

                    else return "Something went wrong";
                },

            },
        }, {
            autoClose: 1000,
            closeButton: true,
        });
        toggleModal();
        modalUser.value = null;
    };
</script>

<template>
    <div v-if="showLoader">
        <Loader />
    </div>
    <div v-else class="flex flex-col justify-center items-center h-[90vh] w-[100%]">
        <img class="rounded-full w-36" :src="userImg" alt="User image">
        <div class="w-[100%] sm:w-[70%] xs:w-max mt-4 flex flex-col gap-2">
            <div v-for="(value, key) in user" :key="key">
                <div
                    v-if="key !== 'pk'"
                    class="flex flex-wrap items-center justify-between p-2 rounded-md border border-gray-900 dark:border-gray-200"
                >
                    <span class="sm:text-xl xs:text-xs font-poppins mr-1">{{ `${labels[key]} :` }}</span>
                    <div class="flex items-center gap-2">
                        <h1 class="sm:text-xl xs:text-xs font-bold font-poppins break-all">
                            {{ value ? value : 'Not entered' }}
                        </h1>
                    </div>
                </div>
            </div>

            <Button
                color="blue"
                @click="toggleModal"
            >
                Edit
            </Button>
        </div>
    </div>

    <Modal v-if="showModal" @toggle-modal="toggleModal">
        <template #form>
            <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
                <div v-for="(value, key) in labels" :key="key">
                    <div v-if="key !== 'email'" class="flex flex-col gap-2">
                        <label :for="key">{{ value }}</label>
                        <input
                            :id="key"
                            type="text"
                            class="border border-gray-300 rounded-md p-2 dark:text-gray-200"
                            :value="(user as User)[key]"
                            @change="(e) => handleChange(e, key)"
                        >
                    </div>
                </div>

                <div class="flex justify-end">
                    <Button type="submit" color="blue">
                        Save
                    </Button>
                </div>
            </form>
        </template>
    </Modal>
</template>
