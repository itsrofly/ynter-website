import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { createBrowserClient } from "@supabase/ssr";

import { useUser } from "../layout";

const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON
)

export default component$(() => {
  const user = useUser();
  const nav = useNavigate();

  return (
    <div>
      Settings
      <br />
      {user.value?.email}

      <button class="btn" onClick$={async () => {
        await supabase.auth.signOut();
        nav("/")
      }}>
        Logout
      </button>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ynter",
  meta: [
    {
      name: "description",
      content: "Ynter Settings",
    },
  ],
};
