import { $, component$, useSignal } from "@builder.io/qwik";
import { server$, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { createBrowserClient } from "@supabase/ssr";

import {
  handleBillingPortal,
  handleCheckout,
  usePremium,
  useUser,
} from "../layout";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON
);

export const handleDeleteUser = server$(async function (id) {
  const serverThis = this;

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
    error,
  } = await supabase_secret.auth.admin.getUserById(id);

  if (user) {
    // Step 1: Find all Stripe customers by the user's email
    const customers = await stripe.customers.list({
      email: user.email,
    });

    // Step 2: Delete all found customers
    const deletePromises = customers.data.map(async (customer) => {
      try {
        await stripe.customers.del(customer.id);
        console.log(`Deleted customer from Stripe: ${customer.id}`);
      } catch (stripeError) {
        console.error(
          `Error deleting customer with ID ${customer.id} from Stripe:`,
          stripeError
        );
      }
    });

    // Wait for all delete operations to finish
    await Promise.all(deletePromises);

    // Step 3: Delete the user from Supabase
    const { error: deleteError } = await supabase_secret.auth.admin.deleteUser(
      user.id,
      false
    );

    if (deleteError) {
      console.error("Error deleting user from Supabase:", deleteError);
      return { success: false, message: "Error deleting user from Supabase" };
    } else {
      console.log("User deleted successfully from Supabase.");
      return {
        success: true,
        message: "User and associated Stripe customers deleted successfully",
      };
    }
  } else {
    console.error("Error retrieving user:", error);
    return { success: false, message: "Error retrieving user" };
  }
});

export default component$(() => {
  const user = useUser();
  const premium = usePremium();
  const nav = useNavigate();
  const isLoading = useSignal(false);
  const isChecked = useSignal(true);

  let isPremium = false;
  let expiration_date;
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
      <div
        class="border border-2 rounded d-flex flex-column gap-2"
        style={{ height: "280px", width: "500px" }}
      >
        <h5 class="mt-4 ms-4">Your Plan</h5>

        <h3
          class={`${isPremium ? "text-success" : "text-body-secondary"} ms-5`}
        >
          {isPremium ? "Ynter Premium" : "Ynter Free"}
        </h3>

        <div class="ms-5 mb-4 d-inline-flex gap-2">
          {premium.value ? (
            <>
              <h5 class="text-center">
                {premium.value?.cancel_at_period_end
                  ? "Premium End:"
                  : "Next Income:"}
              </h5>
              <h5 class="text-center">{expiration_date?.toDateString()}</h5>
            </>
          ) : (
            <>
              <label class="switch">
                <input
                  type="checkbox"
                  checked={isChecked.value}
                  onClick$={() => (isChecked.value = !isChecked.value)}
                />
                <div>
                  <span>
                    {isChecked.value ? "Yearly " : "Monthly"}
                    {isChecked.value && (
                      <p
                        class="text-primary bg-info-subtle rounded"
                        style={{ display: "inline" }}
                      >
                        Save 16%
                      </p>
                    )}
                  </span>
                </div>
              </label>
            </>
          )}
        </div>

        <button
          class="btn border-2 bg-black text-white mt-2 ms-auto me-auto"
          disabled={isLoading.value}
          style={{
            borderColor: "#5FB2FF !important",
            width: "80%",
            height: "45px",
          }}
          onClick$={$(async () => {
            isLoading.value = true;
            const value = isPremium
              ? await handleBillingPortal()
              : await handleCheckout(isChecked.value);

            nav(value as string);
          })}
        >
          {isLoading.value && (
            <span
              class="spinner-grow spinner-grow-sm me-2"
              aria-hidden="true"
            />
          )}
          {isPremium ? "Manage billing" : "Join Premium"}
        </button>
      </div>

      <div
        class="border border-2 rounded d-flex flex-column gap-2"
        style={{ height: "250px", width: "500px" }}
      >
        <h5 class="mt-4 ms-4">Account</h5>
        <div class="ms-5 d-inline-flex gap-2">
          <h5 class="mt-4 text-center">Name:</h5>
          <h5 class="mt-4 text-center">
            {user.value?.user_metadata.full_name}
          </h5>
        </div>
        <div class="ms-5 d-inline-flex gap-3">
          <h5 class="text-center">Email:</h5>
          <h5 class="text-center">{user.value?.email}</h5>
        </div>

        <div class="m-auto d-inline-flex gap-4">
          <a
            href="#"
            class="btn rounded border border-2"
            style={{ width: "200px" }}
            onClick$={async () => {
              await supabase.auth.signOut();
              nav("/");
            }}
          >
            Sign Out
          </a>

          <a
            href="#"
            class="btn btn-danger rounded border border-2"
            style={{ width: "100px" }}
            onClick$={async () => {
              const {
                data: { user },
              } = await supabase.auth.getUser();

              // Show confirmation dialog
              const confirmDelete = window.confirm(
                "Are you sure you want to delete your account?"
              );

              if (confirmDelete) {
                const res = await handleDeleteUser(user?.id);
                if (res.success) {
                  // Redirect to home after successful deletion
                  nav("/");
                } else {
                  alert(res.message);
                }
              }
            }}
          >
            Delete
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
