import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
    const navigate = useNavigate();
    const userReducerState = useSelector(state => state.userRed);

    useEffect(() => {
        if (userReducerState?.authToken && (window.location.pathname === "/login" || window.location.pathname === "/signup")) {
            navigate("/");
        }
    }, [userReducerState?.authToken, navigate]);

    if (userReducerState?.authToken) {
        <Navigate to={"/"} replace />;
    } else {
        return children;
    }
}

export default PublicRoute;
