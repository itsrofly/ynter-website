import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Footbar from "~/components/footbar/footbar";

import AppImage from "~/media/App.png";

export default component$(() => {
  return (
    <div class="h-75">
      <div class="d-flex align-items-center justify-content-center h-100 w-100 gap-5">
        <div
          class="d-flex flex-column align-items-start gap-3"
          style={{ width: "400px", height: "400px" }}
        >
          <h5>The Best Way to Simplify Your Finances</h5>
          <h5 class="mt-3" style={{ fontWeight: 300 }}>
            {/* Text Here */}
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ..............................
            .............................. ............
          </h5>

          <p class="d-inline-flex gap-3 mt-auto ms-4">
            <a
              href="/Download"
              class="btn border-2 bg-black text-white"
              style={{
                borderColor: "#5FB2FF !important",
                width: "100px",
                height: "36px",
              }}
            >
              Download
            </a>
            <a
              href="/More#features"
              class="btn border-black"
              style={{ width: "100px", height: "36px" }}
            >
              More
            </a>
          </p>
        </div>
        <div class="ms-5 d-flex flex-column justify-content-center ps-5">
          <img
            class="ms-5 rounded shadow-lg border border-2 border-primary img-animation"
            src={AppImage}
            alt="app"
            height={400}
            width={590.8}
          />
          {/* Image Here */}
        </div>
      </div>

      <div class="fixed-bottom">
        <Footbar />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ynter - Home",
  meta: [
    {
      name: "description",
      content: "Home",
    },
  ],
};
