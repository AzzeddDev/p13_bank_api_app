import Logo from "./../../assets/img/argentBankLogo.png"
import {Link} from "react-router-dom";
import {routes} from "../../router/routes.ts";

export function Navbar() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={routes.home}>
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to={routes.signIn}>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    )
}