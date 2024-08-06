import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import Background from '~/media/Fgoingon.svg'

export const useErrortDetails = routeLoader$(async ({ query }) => {
    const error_description = query.get("error_description")
    const error_code = Number(query.get("error_code") ?? 0)

    if (error_code >= 500) { 
        // This is a Server Error, it's not normal
        // I will send to the log
        
    }

    return error_description;
});

export default component$(() => {
    const log = useErrortDetails();

    return (
        <div class="text-center">

            <img class="mt-5" src={Background} alt="fgoingon" width={320} height={320} />
            <h3 class="mt-5">
                Something went wrong
            </h3>
            <h4 style={{fontWeight: 300}}>
                {log.value}
            </h4>

        </div>
    );
});

export const head: DocumentHead = {
    title: "Ynter",
    meta: [
        {
            name: "description",
            content: "Ynter Error",
        },
    ],
};
