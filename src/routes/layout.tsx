import { component$, Slot } from "@builder.io/qwik";
import {
  routeLoader$,
  server$,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { createServerClient } from "@supabase/ssr";
import { createClient, type User } from "@supabase/supabase-js";
import Stripe from "stripe";
import Navbar from "~/components/navbar/navbar";

export const onGet: RequestHandler = async ({
  cacheControl,
  cookie,
  env,
  sharedMap,
}) => {
  /*  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
*/

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
            cookies.push({ name, value: details.value });
          }
          return cookies;
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookie.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  // Never use SECRET KEY with createServerClient, supabase helper may leak the key
  // Always use createClient only
  const supabase_secret = createClient(
    env.get("PUBLIC_SUPABASE_URL") as string,
    env.get("SUPABASE_SECRET") as string
  );

  // Retrive User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fetch = await supabase_secret
    .from("accounts")
    .select("customer_id")
    .eq("id", user?.id);

  // Retrive premium just to know, never for validation
  if (fetch.data && fetch.data[0].customer_id) {
    const now = new Date().toISOString();

    const { data } = await supabase_secret
      .from("subscriptions")
      .select()
      .eq("customer_id", fetch.data[0].customer_id as string)
      .gte("expires", now);

    if (data && data[0]) {
      const values = {
        period: data[0].expires,
        cancel_at_period_end: data[0].cancel_at_period_end,
      };
      sharedMap.set("premium", values ?? undefined);
    } else sharedMap.set("premium", undefined);
  } else sharedMap.set("premium", undefined);

  // Set User in the SharedMap if exist
  if (user) {
    sharedMap.set("user", user);
  } else {
    sharedMap.set("user", undefined);
  }
};

export const handleCheckout = server$(async function (Yearly: boolean) {
  const serverThis = this;
  // Create client on the server using cookies data
  const supabase = createServerClient(
    serverThis.env.get("PUBLIC_SUPABASE_URL") as string,
    serverThis.env.get("PUBLIC_SUPABASE_ANON") as string,
    {
      cookies: {
        getAll() {
          const cookies: {
            name: string;
            value: string;
          }[] = [];

          // Conver Qwik Cookie Object to desire array
          for (const [name, details] of Object.entries(
            serverThis.cookie.getAll()
          )) {
            cookies.push({ name, value: details.value });
          }
          return cookies;
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              serverThis.cookie.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  // Never use SECRET KEY with createServerClient, supabase helper may leak the key
  // Always use createClient only
  const supabase_secret = createClient(
    serverThis.env.get("PUBLIC_SUPABASE_URL") as string,
    serverThis.env.get("SUPABASE_SECRET") as string
  );
  // Create Stripe connection
  const stripe = new Stripe(serverThis.env.get("STRIPE_API_KEY") as string);

  // Retrive User using supabse helper
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let customer;
    // Retrive User customer using secret supabase
    const { data } = await supabase_secret
      .from("accounts")
      .select("customer_id")
      .eq("id", user.id);

    if (data && data[0].customer_id) customer = data[0].customer_id as string;
    else {
      // Create customer in stripe if not exist
      // Just in case if edge function didnt work
      const stripe_customer = await stripe.customers.create({
        email: user.email,
      });

      await supabase_secret
        .from("accounts")
        .update({ customer_id: stripe_customer.id })
        .eq("id", user.id);

      customer = stripe_customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer,
      line_items: [
        {
          price: serverThis.env.get(
            Yearly ? "YEARLY_PRICE_ID" : "MONTHLY_PRICE_ID"
          ),
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${serverThis.env.get("DOMAIN")}/Session/Application`,
      cancel_url: `${serverThis.env.get("DOMAIN")}` + this.url.pathname,
    });

    return session.url;
  }
  return "/SignIn";
});

export const handleBillingPortal = server$(async function () {
  const serverThis = this;
  // Create client on the server using cookies data
  const supabase = createServerClient(
    serverThis.env.get("PUBLIC_SUPABASE_URL") as string,
    serverThis.env.get("PUBLIC_SUPABASE_ANON") as string,
    {
      cookies: {
        getAll() {
          const cookies: {
            name: string;
            value: string;
          }[] = [];

          // Conver Qwik Cookie Object to desire array
          for (const [name, details] of Object.entries(
            serverThis.cookie.getAll()
          )) {
            cookies.push({ name, value: details.value });
          }
          return cookies;
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              serverThis.cookie.set(name, value, options);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  // Never use SECRET KEY with createServerClient, supabase helper may leak the key
  // Always use createClient only
  const supabase_secret = createClient(
    serverThis.env.get("PUBLIC_SUPABASE_URL") as string,
    serverThis.env.get("SUPABASE_SECRET") as string
  );
  // Create Stripe connection
  const stripe = new Stripe(serverThis.env.get("STRIPE_API_KEY") as string);

  // Retrive User using supabse helper
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let customer;
    // Retrive User customer using secret supabase
    const { data } = await supabase_secret
      .from("accounts")
      .select("customer_id")
      .eq("id", user.id);

    if (data && data[0].customer_id) customer = data[0].customer_id as string;
    else {
      // Create customer in stripe if not exist
      // Just in case if edge function didnt work
      const stripe_customer = await stripe.customers.create({
        email: user.email,
      });

      await supabase_secret
        .from("accounts")
        .update({ customer_id: stripe_customer.id })
        .eq("id", user.id);

      customer = stripe_customer.id;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer,
      return_url: `${serverThis.env.get("DOMAIN")}/Settings`,
    });

    return session.url;
  }
  return "/SignIn";
});

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user") as User | undefined;
});

export const usePremium = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("premium") as
    | {
        period: string;
        cancel_at_period_end: number;
      }
    | undefined;
});

export default component$(() => {
  return (
    <div class="vh-100">
      <Navbar />
      <Slot />
    </div>
  );
});
