import { ViteSSG } from "vite-ssg";
import Previewer from "virtual:vue-component-preview";
import App from "./App.vue";
import type { UserModule } from "./types";
import "@unocss/reset/tailwind.css";
import "./styles/main.css";
import "uno.css";
import "vue3-toastify/dist/index.css";
import "@vuepic/vue-datepicker/dist/main.css";
import { routes, setRouter } from "~/router";

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
    App,
    { routes },
    (ctx) => {
    // install all modules under `modules/`
        const { router, isClient } = ctx;
        if (isClient)
            setRouter(router);

        Object.values(import.meta.glob<{ install: UserModule }>("./modules/*.ts", { eager: true }))
            .forEach(i => i.install?.(ctx));
        ctx.app.use(Previewer);
    },
);
