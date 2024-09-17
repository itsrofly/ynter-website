import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import Footbar from "~/components/footbar/footbar";
import { handleCheckout, useUser } from "../layout";

import AppImage from "~/media/App.png";

export default component$(() => {
  const isChecked = useSignal(true);
  const isLoading = useSignal(false);
  const nav = useNavigate();

  return (
    <div class="h-100 d-flex flex-column gap-5">
      {/* Premium */}
      <div
        class="w-100 d-flex justify-content-center"
        style={{ marginBottom: "200px" }}
      >
        <div class="mt-5" style={{ width: "500px", height: "400px" }}
        id="section-text-area">
          <h5 class="mt-5 text-center me-5">All Ynter.</h5>
          <h5 class="mt-5" style={{ fontWeight: 300 }}>
            Full potential with the Premium, featuring all the exclusive
            benefits.
            <div class="d-flex flex-row" id="benefits-text">
              <div class="mt-3">
                <br />
                • €10/⁠month
                <br />
                • Cancel anytime
                <br />
                <a
                  href="/Terms"
                  class="ms-2 text-black link-underline-secondary"
                  style={{ fontSize: "13px" }}
                >
                  Terms apply.
                </a>
              </div>
              <div
                class="ms-auto mt-auto me-5 d-flex flex-column"
                id="get-started"
                style={{ width: "200px" }}
              >
                <label class="mt-4 switch">
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

                <button
                  class="btn border-2 mt-3 bg-black text-white"
                  disabled={isLoading.value}
                  style={{
                    borderColor: "#5FB2FF !important",
                    height: "36px",
                  }}
                  onClick$={async () => {
                    isLoading.value = true;
                    const value = await handleCheckout(isChecked.value);
                    nav(value as string);
                  }}
                >
                  {isLoading.value && (
                    <span
                      class="spinner-grow spinner-grow-sm me-2"
                      aria-hidden="true"
                    />
                  )}
                  Get Started
                </button>
              </div>
            </div>
          </h5>
        </div>
      </div>

      {/* */}
      <div id="features" />

      {/*  First Feature */}

      <div
        class="d-flex align-items-center justify-content-center w-100 gap-5 mt-5"
        style={{ marginBottom: "400px" }}
        id="section"
      >
        <div
        id="section-text-area"
          class="d-flex flex-column align-items-start"
          style={{ width: "400px", height: "400px" }}
        >
          <h5>Feature.</h5>
          <h5 class="mt-3" style={{ fontWeight: 300 }}>
            {/* Text Here */}
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ............
          </h5>
        </div>
        <div class="ms-5 d-flex flex-column justify-content-center"
        id="section-image-parent">
          <img
            class="ms-5 rounded shadow-lg border img-animation border border-2 border-primary"
            id="section-image-area"
            src={AppImage}
            alt="app"
            height={400}
            width={590.8}
          />
          {/* Image Here */}
        </div>
      </div>

      {/*  Second Feature */}
      <div
        class="d-flex align-items-center justify-content-center w-100 gap-5 mt-5"
        style={{ marginBottom: "400px" }}
                id="section"
      >
        <div class="d-flex flex-column justify-content-center"
        id="section-image-parent">
          <img
            class="ms-5 rounded shadow-lg border img-animation border border-2 border-primary"
            id="section-image-area"
            src={AppImage}
            alt="app"
            height={400}
            width={590.8}
          />
          {/* Image Here */}
        </div>
        <div
          class="ms-5 d-flex flex-column align-items-start"
          style={{ width: "400px", height: "400px" }}
                  id="section-text-area"
        >
          <h5>Feature.</h5>
          <h5 class="mt-3" style={{ fontWeight: 300 }}>
            {/* Text Here */}
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ............
          </h5>
        </div>
      </div>

      {/*  Third Feature */}
      <div class="d-flex align-items-center justify-content-center w-100 gap-5 mt-5 mb-5"
          id="section">
        <div
          class="d-flex flex-column align-items-start"
          style={{ width: "400px", height: "400px" }}
                            id="section-text-area"
        >
          <h5>Feature.</h5>
          <h5 class="mt-3" style={{ fontWeight: 300 }}>
            {/* Text Here */}
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ............
          </h5>
        </div>
        <div class="ms-5 d-flex flex-column justify-content-center"
        id="section-image-parent">
          <img
            class="ms-5 rounded shadow-lg border img-animation border border-2 border-primary"
             id="section-image-area"
            src={AppImage}
            alt="app"
            height={400}
            width={590.8}
          />
          {/* Image Here */}
        </div>
      </div>

      {/* Premium */}
      <div class="w-100 d-flex justify-content-center mt-5 mb-5">
        <div class="mt-5" style={{ width: "500px", height: "400px" }} 
        id="section-text-area">
          <h5 class="mt-5 text-center me-5">Get premium started.</h5>
          <h5 class="mt-5" style={{ fontWeight: 300 }}>
            Interested in all these features, get them all and more with
            premium.
            <div class="d-flex flex-row" id="benefits-text">
              <div>
                <br />
                • €10/⁠month
                <br />
                • Cancel anytime
                <br />
                <a
                  href="/Terms"
                  class="ms-2 text-black link-underline-secondary"
                  style={{ fontSize: "13px" }}
                >
                  Terms apply.
                </a>
              </div>
              <div
                class="ms-auto mt-auto me-5 d-flex flex-column"
                id="get-started"
                style={{ width: "200px" }}
              >
                <label class="mt-4 switch">
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

                <a
                  href="#"
                  class="btn border-2 mt-3 bg-black text-white"
                  style={{
                    borderColor: "#5FB2FF !important",
                    height: "36px",
                  }}
                  onClick$={async () => {
                    isLoading.value = true;
                    const value = await handleCheckout(isChecked.value);
                    nav(value as string);
                  }}
                >
                  {isLoading.value && (
                    <span
                      class="spinner-grow spinner-grow-sm me-2"
                      aria-hidden="true"
                    />
                  )}
                  Get Started
                </a>
              </div>
            </div>
          </h5>
        </div>
      </div>

      {/* Question */}
      <div class="w-100 mt-5 mb-5 p-5">
        <h5 class="text-center mb-5" id="support">
          Any questions?
        </h5>

        <div class="accordion border-0" id="accordionExample">
          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Where the dashboard data is saved?
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>

          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How do I add people to my plan?
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>

          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                My dashboard data is used for AI training?
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>

          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                How can I cancel my membership?
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>

          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Have other questions?
              </button>
            </h2>
            <div
              id="collapseFive"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footbar />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ynter - More",
  meta: [
    {
      name: "description",
      content: "More",
    },
  ],
};
