import { component$ } from '@builder.io/qwik';


export default component$(() => {
    return (
        <nav class="navbar" style={{backgroundColor: "rgba(217, 217, 217, 0.18)"}}>
            <div class="container-fluid d-flex flex-column justify-content-center" style={{ height: "100px" }}>
                <div class="d-flex justify-content-between" style={{width: "225px"}}>
                    <a class="nav-link" href="/Privacy" style={{ display: "inline" }}>
                        <h6 style={{ display: "inline" }}>Privacy Policy</h6>
                    </a>
                    <a class="nav-link" href="/Terms" style={{ display: "inline" }}>
                        <h6 style={{ display: "inline" }}>Terms of Service</h6>
                    </a>
                </div>
                <div class="mt-2">
                    @Ynter - All rights reserved.
                </div>

            </div>
        </nav>
    );
});