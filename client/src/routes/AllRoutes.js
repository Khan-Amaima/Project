import Home from "../screens/Home";
import Setting from "../screens/Settings";
import Uploads from "../screens/Uploads";
import ForgotPassword from "../screens/auth/ForgotPassword";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import PageNotFound from "./PageNotFound";
export const AllRoutes = [
    {
        path: "/signup",
        name: "Signup",
        component: <Signup />,
        isPublic: true,
    },
    {
        path: "/login",
        name: "Login",
        component: <Login />,
        isPublic: true,
    },
    {
        path: "/forgotPassword",
        name: "ForgotPassword",
        component: <ForgotPassword />,
        isPublic: true,
    },
    { 
        path: "/",
        name: "Home",
        component: <Home />,
        isPublic: false,
    }, 
    { 
        path: "/Uploads",
        name: "Uploads",
        component: <Uploads />,
        isPublic: false,
    }, 
    { 
        path: "/settings",
        name: "Setting",
        component: <Setting />,
        isPublic: false,
    }
] 