import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
     { !isAuthenticated?(<Navigate to="/auth" />):(<Outlet />)}
    </>
  );
};
export default ProtectedRoutes;
