<script setup lang="ts">
    import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/vue/20/solid";
    import { handleLogin } from "~/service/login";

    const { t } = useI18n();

    const payload = ref({
        username: "",
        password: "",
    });
    

    const showPassword = ref(false);
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        handleLogin(payload.value);
        console.log("submit");
    };
</script>

<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-28 w-auto" src="../assets/logo.jpg" alt="Your Company">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    {{ t('headings.signIn') }}
                </h2>
            </div>
            <form class="mt-8 space-y-6" :onsubmit="handleSubmit">
                <input type="hidden" name="remember" value="true">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div class="relative">
                        <label for="username" class="sr-only">{{ t('labels.username') }}</label>
                        <input
                            id="username"
                            v-model="payload.username"
                            name="username"
                            type="text"
                            autocomplete="username"
                            required
                            class="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                            placeholder="Username"
                        >
                    </div>
                    <div class="relative">
                        <label for="password" class="sr-only">{{ t('labels.password') }}</label>
                        <input
                            id="password"
                            v-model="payload.password"
                            name="password"
                            :type="showPassword ? 'text' : 'password'"
                            autocomplete="current-password"
                            required
                            class="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                            placeholder="Password"
                        >
                        <div class="absolute z-10 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <EyeIcon
                                v-if="!showPassword"
                                class="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                                @click="showPassword = !showPassword"
                            />
                            <EyeSlashIcon
                                v-else
                                class="h-5 w-5 text-gray-400 cursor-pointer"
                                aria-hidden="true"
                                @click="showPassword = !showPassword"
                            />
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        >
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">{{ t('labels.rememberMe') }}</label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                          {{ t('labels.forgotPassword') }}
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                            />
                        </span>
                        {{ t('button.signin') }}
                    </button>
                </div>
                <div class="flex items-center justify-center">
                    <p class="text-sm text-gray-600">
                        {{ t('paragraphs.dontHaveAccount')  }}
                    </p>
                    <RouterLink :to="{ name: 'register' }">
                        <p class="ml-2 font-medium text-indigo-600 hover:text-indigo-500">
                            {{ t('paragraphs.signup')  }}
                        </p>
                    </RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>
