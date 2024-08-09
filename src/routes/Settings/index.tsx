import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { createBrowserClient } from "@supabase/ssr";

import { handleBillingPortal, handleCheckout, usePremium, useUser } from "../layout";

const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON
)

export default component$(() => {
  const user = useUser();
  const premium = usePremium();
  const nav = useNavigate();
  const isLoading = useSignal(false);
  const isChecked = useSignal(true);

  let isPremium = false;
  let expiration_date
  if (premium.value) {
    expiration_date = new Date(premium.value.period);
    const now = new Date();

    if (expiration_date >= now) {
      isPremium = true; // Set premium to true if the date hasn't expired
    }
  }
  return (
    <div class="h-100 d-flex flex-column justify-content-evenly align-items-center">
      <h3>Settings</h3>
      <div class="border border-2 rounded d-flex flex-column gap-2" style={{ height: "280px", width: "500px" }}>
        <h5 class="mt-4 ms-4">Your Plan</h5>

        <h3 class={`${isPremium ? "text-success" : "text-body-secondary"} ms-5`}>
          {isPremium ? "Ynter Premium" : "Ynter Free"}
        </h3>

        <div class="ms-5 mb-4 d-inline-flex gap-2">
          {premium.value ? <>
            <h5 class="text-center">{premium.value?.cancel_at_period_end ? "Premium End:" : "Next Income:"}</h5>
            <h5 class="text-center">{expiration_date?.toDateString()}</h5>
          </> :
            <>
              <label class="switch" >
                <input type="checkbox" checked={isChecked.value}
                  onClick$={() => isChecked.value = !isChecked.value
                  } />
                <div>
                  <span>
                    {isChecked.value ? "Yearly " : "Monthly"}
                    {isChecked.value &&
                      <p class="text-primary bg-info-subtle rounded"
                        style={{ display: "inline" }}>

                        Save 16%
                      </p>}
                  </span>
                </div>
              </label>
            </>}
        </div>



        <button class="btn border-2 bg-black text-white mt-2 ms-auto me-auto"
          disabled={isLoading.value}
          style={{
            borderColor: "#5FB2FF !important",
            width: "80%", height: "45px"
          }}
          onClick$={$(async () => {
            isLoading.value = true
            const value = isPremium ?
              await handleBillingPortal() :
              await handleCheckout(isChecked.value);

            nav(value as string);
          })}>
          {isLoading.value && <span class="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />}
          {isPremium ? "Manage billing" : "Join Premium"}
        </button>
      </div>

      <div class="border border-2 rounded d-flex flex-column gap-2" style={{ height: "250px", width: "500px" }}>
        <h5 class="mt-4 ms-4">Account</h5>
        <div class="ms-5 d-inline-flex gap-2">
          <h5 class="mt-4 text-center">Name:</h5>
          <h5 class="mt-4 text-center">{user.value?.user_metadata.full_name}</h5>
        </div>
        <div class="ms-5 d-inline-flex gap-3">
          <h5 class="text-center">Email:</h5>
          <h5 class="text-center">{user.value?.email}</h5>
        </div>

        <div class="m-auto d-inline-flex gap-4">
          <a href="#" class="btn rounded border border-2" style={{ width: "200px" }}
            onClick$={async () => {
              await supabase.auth.signOut()
              nav("/")
            }}>
            Sign Out
          </a>
        </div>
      </div>

    </div>
  );
});

export const head: DocumentHead = {
  title: "Ynter - Settings",
  meta: [
    {
      name: "description",
      content: "Settings",
    },
  ],
};
