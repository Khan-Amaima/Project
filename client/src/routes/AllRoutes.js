import Home from "../screens/Home";
import ForgotPassword from "../screens/auth/ForgotPassword";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

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
] 