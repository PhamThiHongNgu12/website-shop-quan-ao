import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminHeader from "../Header/AdminHeader";
import routes from "./../../routes";

const Admin = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <AdminHeader />
          <Routes>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.component} />
            ))}
          </Routes>
        </>
      )}
    </>
  );
};
export default Admin;
