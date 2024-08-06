import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { createBrowserClient } from "@supabase/ssr";

import Footbar from "~/components/footbar/footbar";

import Google from "~/media/google.png"
import Background from '~/media/Login.svg'
import Back from '~/media/back.svg'

const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON
)

export default component$(() => {
  // Oauth
  const nav = useNavigate();

  // Email
  const email = useSignal("");
  const message = useSignal({ type: "", content: "" });
  const isLoading = useSignal(false);

  return (
    <div class="position-relative w-100 h-75">
      <form preventdefault:submit onSubmit$={async () => {

        isLoading.value = true
        const { error } = await supabase.auth.signInWithOtp({
          email: email.value,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: 'http://localhost:5173/Session/Website',
          },
        })

        if (error) {
          isLoading.value = false
          message.value = {
            type: "text-danger",
            content: "Unable to send the verification link. Please try again later."
          }
          return;
        }

        isLoading.value = false
        message.value = {
          type: "text-success",
          content: "A verification link has been sent to your email."
        }
      }}>
        <div class="rounded-4 shadow position-absolute top-50 start-50 translate-middle"
          style={{
            backgroundColor: "rgba(217, 217, 217, 0.18)",
            height: "600px", width: "600px"
          }}>


          <a href="/" class="btn mt-3 ms-3">
            <img src={Back} alt="back" width={24} height={24} />
          </a>

          <div class="d-flex flex-column h-50 align-items-center w-100 gap-2">
            <img class="mb-3" src={Background} alt="loginbg" width={320} height={320} />

            <a class="btn border border-2"
              preventdefault:keydown
              onClick$={async () => {

                const { data } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    scopes: "Profile email",
                    skipBrowserRedirect: true,
                    redirectTo: "http://localhost:5173/Session/Website"
                  }
                })

                if (data.url)
                  await nav(data.url)

              }}
              style={{ width: "300px" }}>
              <img src={Google} width={18} height={18} alt="google"
                style={{ display: "inline" }} />

              <h6 class="ms-2" style={{ display: "inline" }} >
                Continue with Google
              </h6>
            </a>

            <h6>
              Or
            </h6>

            <input type="email" name="email" class="form-control border border-2" id="FormControlInput1" placeholder="Email"
              style={{ width: "300px" }} required
              value={email.value} onChange$={(ev: any) => email.value = (ev.target.value)} />

            <button class="btn border border-2" type="submit" disabled={isLoading.value}
              style={{ width: "300px" }}>
              {isLoading.value && <span class="spinner-grow spinner-grow-sm" aria-hidden="true" />}

              <h6 class="ms-2" style={{ display: "inline" }} >
                Continue with Email
              </h6>
            </button>

            <div class={message.value.type}>
              {message.value.content}
            </div>
            {/* Another provider here */}
          </div>
        </div>

        <div class="fixed-bottom">
          <Footbar />
        </div>
      </form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ynter",
  meta: [
    {
      name: "description",
      content: "Ynter Sign In",
    },
  ],
};
