import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Footbar from "~/components/footbar/footbar";

export default component$(() => {
  
  return (
    <div class="h-75">
      <div class="d-flex align-items-center justify-content-center h-100 w-100 gap-5">

        <div class="d-flex flex-column align-items-start"
          style={{ width: "400px", height: "400px" }}>

          <h5>The Best Way to Simplify Your Finances</h5>
          <h5 class="mt-3" style={{ fontWeight: 300  }}>
            {/* Text Here */}
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ............
          </h5>

          <p class="d-inline-flex gap-3 mt-auto ms-4">
            <a href="/Download" class="btn border-2 bg-black text-white"
              style={{
                borderColor: "#5FB2FF !important",
                width: "100px", height: "36px"
              }}>

              Download
            </a>
            <a href="/More#features" class="btn border-black"
              style={{ width: "100px", height: "36px" }}>

              More
            </a>
          </p>
        </div>
        <div class="ms-5 d-flex flex-column justify-content-center"
          style={{ width: "400px", height: "400px" }}>
          <svg width="100%" height="100%" viewBox="0 0 1778 1140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1159 296L1460.55 120.778L1581.91 108.748L1778 1" stroke="#5FB2FF" stroke-width="2" />
            <path d="M1015.5 462.5L743.5 770L372 878L0 1138.5" stroke="#5FB2FF" stroke-width="2" />
          </svg>
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
