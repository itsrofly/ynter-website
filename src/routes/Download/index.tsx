import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Footbar from "~/components/footbar/footbar";

import Windows from '~/media/windows.svg'
import Macos from '~/media/macos.svg'
import Ubuntu from '~/media/ubuntu.svg'
import Back from '~/media/back.svg'

export default component$(() => {

  return (
    <div class="position-relative w-100 h-75">
      <div class="rounded-4 shadow position-absolute top-50 start-50 translate-middle"
        style={{
          backgroundColor: "rgba(217, 217, 217, 0.18)",
          height: "500px", width: "600px"
        }}>

        <a href="/" class="btn m-3">
          <img src={Back} alt="back" width={24} height={24} />
        </a>
        <div class="d-flex flex-row justify-content-center
        align-items-center gap-5 h-75 mt-2">
          <div class="d-flex flex-column align-items-center gap-5">
            <img src={Windows} alt="windows" width={64} height={64} />


            <div>
              <a href="#" class="btn border-2 bg-black text-white"
                style={{
                  borderColor: "#5FB2FF !important",
                  width: "100px", height: "36px"
                }}>

                Windows
              </a>

              <h5 class="mt-3" style={{ fontWeight: 300 }}>
                Windows 11, 10
              </h5>
            </div>
          </div>

          <div class="d-flex flex-column align-items-center gap-5">
            <img src={Macos} alt="macos" width={64} height={64} />

            <div>
              <a href="#" class="btn border-2 bg-black text-white"
                style={{
                  borderColor: "#5FB2FF !important",
                  width: "100px", height: "36px"
                }}>

                macOS
              </a>

              <h5 class="mt-3" style={{ fontWeight: 300 }}>
                macOs 10.13+
              </h5>
            </div>

          </div>

          <div class="d-flex flex-column align-items-center gap-5">
            <img src={Ubuntu} alt="ubuntu" width={64} height={64} />

            <div>
              <a href="#" class="btn border-2 bg-black text-white"
                style={{
                  borderColor: "#5FB2FF !important",
                  width: "100px", height: "36px"
                }}>

                Ubuntu
              </a>

              <h5 class="mt-3 ms-4" style={{ fontWeight: 300 }}>
                .deb
              </h5>
            </div>

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
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
