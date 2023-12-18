import React from "react";
// import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // if (!user) {
  // return <Navigate to={"/login"} replace />;
  // } else {
  return children;
  // }
}

export default PrivateRoute;
