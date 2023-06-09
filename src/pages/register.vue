<script setup lang="ts">
    import { LockClosedIcon } from "@heroicons/vue/20/solid";
    import { toast } from "vue3-toastify";
    import { handleRegister } from "~/service/register";

    const payload = ref({
        email: "",
        username: "",
        password1: "",
        password2: "",
    });

    const { t } = useI18n();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (payload.value.password1 !== payload.value.password2) {
            toast.error("Passwords do not match");
            return;
        }

        handleRegister(payload.value);
    };
</script>

<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                    <div>
                        <label for="password" class="sr-only">{{ t('labels.password') }}</label>
                        <input
                            id="password" v-model="payload.password1" name="password" type="password" autocomplete="current-password"
                            required
                            class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-gray-200 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none" placeholder="Password"
                        >
                    </div>
                    <div>
                        <label for="password1" class="sr-only">{{ t('labels.password') }}</label>
                        <input
                            id="password1" v-model="payload.password2" name="password1" type="password" autocomplete="current-password"
                            required
                            class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-gray-200 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none" placeholder="Confirm password"
                        >
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
