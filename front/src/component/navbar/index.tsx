import Logo from "./../../assets/img/argentBankLogo.png"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "../../router/routes.ts"
import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../../redux/store"
import {logout} from "../../redux/store/userSlice"

export function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector((state: RootState) => state.user.token)
    const user = useSelector((state: RootState) => state.user.profile)
    const loading = useSelector((state: RootState) => state.user.loading)

    const handleLogout = () => {
        dispatch(logout())
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
                {token ? (
                    <div className={"isConnected"}>
                        <Link className="main-nav-item" to={routes.dashboard}>
                            <i className="fa fa-user-circle"></i>
                            {loading ? "Loading..." : user?.firstName || "User"}
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