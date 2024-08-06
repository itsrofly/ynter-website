import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { createServerClient } from '@supabase/ssr'
import { User } from "@supabase/supabase-js";
import Navbar from "~/components/navbar/navbar";


export const onGet: RequestHandler = async ({ cacheControl, cookie, env, sharedMap }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });

  // Create client on the server using cookies data
  const supabase = createServerClient(
    env.get("PUBLIC_SUPABASE_URL") as string,
    env.get("PUBLIC_SUPABASE_ANON") as string,
    {
      cookies: {
        getAll() {
          const cookies: {
            name: string;
            value: string;
          }[] = [];

          // Conver Qwik Cookie Object to desire array
          for (const [name, details] of Object.entries(cookie.getAll())) {
            cookies.push({ name, value: details.value })
          }
          return cookies
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookie.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  // Retrive User
  const { data: { user } } = await supabase.auth.getUser()

  // Set User in the SharedMap if exist
  if (user) {
    sharedMap.set("user", user);
  } else {
    sharedMap.set("user", undefined);
  }
};

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get('user') as User | undefined;
});

export default component$(() => {
  return <div class="vh-100">
    <Navbar />
    <Slot />
  </div>;
});
