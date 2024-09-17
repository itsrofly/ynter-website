import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Footbar from "~/components/footbar/footbar";

import Windows from "~/media/windows.svg";
import Macos from "~/media/macos.svg";
import Flathub from "~/media/flathub.svg";
import Back from "~/media/back.svg";

export default component$(() => {
  return (
    <div class="position-relative w-100 h-75">
      <div
        class="rounded-4 shadow position-absolute top-50 start-50 translate-middle"
        style={{
          backgroundColor: "rgba(217, 217, 217, 0.18)",
          height: "500px",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <a href="/" class="btn m-3">
          <img src={Back} alt="back" width={24} height={24} />
        </a>
        <div
          class="d-flex flex-column justify-content-center
        align-items-center gap-3 h-75 mt-2"
        >
          <div>
            <a
              
              href="#"
              class="btn border-2 bg-black text-white d-flex disabled"
              style={{
                borderColor: "#5FB2FF !important",
                width: "150px",
                height: "36px",
              }}
            >
              Windows
              <img
                class="ms-auto"
                src={Windows}
                alt="windows"
                width={20}
                height={20}
              />
            </a>
          </div>

          <div>
            <a
              href="#"
              class="btn border-2 bg-black text-white d-flex disabled"
              style={{
                borderColor: "#5FB2FF !important",
                width: "150px",
                height: "36px",
              }}
            >
              macOS
              <img
                class="ms-auto"
                src={Macos}
                alt="macos"
                width={20}
                height={20}
              />
            </a>
          </div>

          <div>
            <a
              href="#"
              class="btn border-2 bg-black text-white d-flex disabled"
              style={{
                borderColor: "#5FB2FF !important",
                width: "150px",
                height: "36px",
              }}
            >
              Linux
              <img
                class="ms-auto"
                src={Flathub}
                alt="macos"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>

      <div class="fixed-bottom">
        <Footbar />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Ynter - Download",
  meta: [
    {
      name: "description",
      content: "Download",
    },
  ],
};
