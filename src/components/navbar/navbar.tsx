import { component$ } from '@builder.io/qwik';
import Person from '~/media/person.svg';
import Logo from '~/media/logo.svg';
import { useUser } from '~/routes/layout';

export default component$(() => {
    const log = useUser();
    return (
        <nav class="navbar sticky-top bg-white border-2 border-bottom border-primary pt-3" style={{ borderColor: "#5FB2FF !important" }}>
            <div class="container-fluid h-100 d-flex justify-content-around align-items-center" style={{ height: "50px" }}>
                <div>
                    <a class="nav-link d-inline-flex gap-3" href="/">
                    <img src={Logo} alt="logo" height={32} width={32} />
                    </a>
                </div>

                <div class="d-flex gap-5">
                    <a class="nav-link" href="/More" style={{ display: "inline" }}>
                        <h5 style={{ display: "inline" }}>Premium</h5>
                    </a>
                    <a href={log.value ? "/Settings" : "/SignIn"}>
                        <img src={Person} alt="person" height={24} width={24} />
                    </a>
                </div>

            </div>
        </nav>
    );
});