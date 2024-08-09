import { type RequestHandler } from "@builder.io/qwik-city";
import { type User } from "@supabase/supabase-js";

export const onGet: RequestHandler = async ({ sharedMap, redirect }) => {
    const log = sharedMap.get('user') as User | undefined

    // If not logged in return to signin
    if (log) {
        throw redirect(
            308,
            "/Settings"
        );
    }
}