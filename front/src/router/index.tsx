import {Route, Routes} from "react-router-dom"
import {routes} from "./routes.ts"
import {Home} from "../pages/home"
import {SignIn} from "../pages/sign-in"
import {Dashboard} from "../pages/user"


const Router = () => {
    return (
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.signIn} element={<SignIn />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
            {/*<Route path={routes.notFound} element={<Home />} />*/}
        </Routes>
    )
}

export default Router