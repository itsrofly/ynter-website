import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Background from '~/media/404.svg'

export default component$(() => {
    return (
        <div class="text-center">

            <img class="mt-5" src={Background} alt="404" width={320} height={320} />
            <h3 class="mt-5">
                404
            </h3>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Ynter - 404",
    meta: [
        {
            name: "description",
            content: "404 Error",
        },
    ],
};
