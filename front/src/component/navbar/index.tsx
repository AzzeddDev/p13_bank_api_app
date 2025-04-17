import Logo from "./../../assets/img/argentBankLogo.png"
import {Link, useNavigate} from "react-router-dom"
import {routes} from "../../router/routes.ts"
import {useEffect, useState} from "react";
import {useUserProfile} from "../../hooks/useUserProfile";

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const { userProfile, loading, error, updateProfile } = useUserProfile()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate(routes.home)
    }

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
                {isLoggedIn ? (
                    <div className={"isConnected"}>
                        <Link className="main-nav-item" to={routes.dashboard}>
                            <i className="fa fa-user-circle"></i>
                            {loading ? "Loading..." : userProfile?.firstName || "User"}
                        </Link>
                        <a className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Log out
                        </a>
                    </div>
                ) : (
                    <Link className="main-nav-item" to={routes.signIn}>
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}