import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Background from '~/media/Success.svg'

export default component$(() => {
    return (
        <div class="text-center">

                <img class="mt-5" src={Background} alt="success" width={320} height={320} />
                <h4 class="mt-5">
                    Login successful, you can close this window and continue using Ynter.
                </h4>

            </div>
            );
});

            export const head: DocumentHead = {
                title: "Ynter",
            meta: [
            {
                name: "description",
            content: "Ynter Home",
        },
            ],
};
