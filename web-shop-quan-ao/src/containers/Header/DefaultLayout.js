import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Home from "../../pages/Home";
import Cart from "../../pages/Cart";
import Product from "../../pages/Product";

const DefaultLayout = () => {
  const isLoggedIns = useSelector((state) => state.userauth.isLoggedIns);
  return (
    <>
      {isLoggedIns == false ? (
        <Navigate to="/logins" />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:cateid" element={<Product />} />
          </Routes>
        </>
      )}
    </>
  );
};
export default DefaultLayout;
