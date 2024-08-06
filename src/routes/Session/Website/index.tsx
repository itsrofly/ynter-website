import type { RequestHandler } from "@builder.io/qwik-city";
import { createServerClient } from "@supabase/ssr";


export const onGet: RequestHandler = async ({ query, redirect, env, cookie }) => {
  const code = query.get("code");
  const error = query.get("error");

  // Manage Error
  if (error || !code) {
    // Send to analytics
    const error_code = query.get("error_code");
    const error_description = query.get("error_description");

    throw redirect(
      308,
      "/Error?error_code=" + error_code + "&error_description=" + error_description
    );
  }

  // Create Client on server using cookie informations
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

  // Exchange code for session
  await supabase.auth.exchangeCodeForSession(code);

  throw redirect(
    308,
    "/Settings"
  );
};

