<script setup lang="ts">
    import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/vue/20/solid";
    import { toast } from "vue3-toastify";
    import { useUserStore } from "~/stores/user";

    const router = useRouter();
    const { registerUser } = useUserStore();
    const payload = ref({
        email: "",
        username: "",
        password1: "",
        password2: "",
    });

    const showPassword1 = ref(false);
    const showPassword2 = ref(false);

    const { t } = useI18n();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (payload.value.password1 !== payload.value.password2) {
            toast.error("Passwords do not match");
            return;
        }

        await toast.promise(
            registerUser(payload.value),
            {
                pending: "Creating an account...",
                success: "Created successfully",
                error: {
                    render: (error: any) => {
                        const errors = error?.data?.response.data;
                        if (errors.username)
                            return errors.username;

                        if (errors.email)
                            return errors.email;

                        if (errors.password1)
                            return errors.password1;

                        if (errors.non_field_errors)
                            return errors.non_field_errors;

                        else return "Something went wrong";
                    },
                },
            }, {
                autoClose: 3000,
                closeButton: true,
            });
        await router.push("/");
    };
</script>

<template>
    <div class="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-28 w-auto" src="../assets/logo.jpg" alt="Todo app">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                    {{ t('headings.signUp') }}
                </h2>
            </div>
            <form class="mt-8 space-y-6" :onsubmit="handleSubmit">
                <input type="hidden" name="remember" value="true">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">{{ t('labels.email') }}</label>
                        <input
                            id="email-address" v-model="payload.email" name="email" type="email"
                            autocomplete="email"
                            class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-gray-200 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none" placeholder="Email address"
                        >
                    </div>
                    <div>
                        <label for="username" class="sr-only">{{ t('labels.username') }}</label>
                        <input
                            id="username" v-model="payload.username" name="username" type="text" autocomplete="username"
                            required
                            class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-gray-200 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none" placeholder="Username"
                        >
                    </div>
                    <div class="relative">
                        <label for="password" class="sr-only">{{ t('labels.password') }}</label>
                        <input
                            id="password"
                            v-model="payload.password1"
                            name="password"
                            :type="showPassword1 ? 'text' : 'password'"
                            autocomplete="current-password"
                            required
                            class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-gray-200 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                            placeholder="Password"
                        >
                        <div class="absolute z-10 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <EyeIcon
                                v-if="!showPassword1"
                                class="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                                @click="showPassword1 = !showPassword1"
                            />
                            <EyeSlashIcon
                                v-else
                                class="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                                @click="showPassword1 = !showPassword1"
                            />
                        </div>
                    </div>
                    <div class="relative">
                        <label for="password1" class="sr-only">{{ t('labels.password') }}</label>
                        <input
                            id="password1"
                            v-model="payload.password2"
                            name="password1"
                            autocomplete="current-password"
                            :type="showPassword2 ? 'text' : 'password'"
                            required
                            class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-gray-200 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                            placeholder="Confirm password"
                        >
                        <div class="absolute z-10 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <EyeIcon
                                v-if="!showPassword2"
                                class="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                                @click="showPassword2 = !showPassword2"
                            />
                            <EyeSlashIcon
                                v-else
                                class="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                                @click="showPassword2 = !showPassword2"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        color="blue"
                    >
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        {{ t('button.signup') }}
                    </Button>
                </div>
                <div class="flex items-center justify-center">
                    <p class="text-sm text-gray-600">
                        {{ t('paragraphs.haveAccount') }}
                    </p>
                    <RouterLink :to="{ name: 'login' }">
                        <p class="ml-2 font-medium text-indigo-600 hover:text-indigo-500">
                            {{ t('paragraphs.signin') }}
                        </p>
                    </RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>
