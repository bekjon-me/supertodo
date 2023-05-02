<template>
    <header class="flex justify-between items-center mb-2 min-h-[3.8rem]">
        <RouterLink to="/">
            <h2 class="body-font font-poppins text-xl font-semibold">
                AdvancedTodo
            </h2>
        </RouterLink>
        <div class="flex items-center gap-2">
            <ThemeSwitcher />
            <Dropdown />
        </div>
    </header>
</template>
