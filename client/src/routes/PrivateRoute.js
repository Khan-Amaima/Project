import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userReducerState = useSelector(state => state.userRed);

  if (!userReducerState?.authToken) {
    return <Navigate to={"/login"} replace />;
  } else {
    return children;
  }
}

export default PrivateRoute;
