import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./containers/Header/DefaultLayout";
import Login from "./containers/Auth/Login";
import Admin from "./containers/Auth/Admin";
import Home from "./pages/Home";
import Register from "./containers/Auth/Login_Register";
import Product from "./pages/Product";
import Blog from "./containers/Auth/Blog";
import ProductDetail from "./pages/ProductDetail";
// import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="" element={<Home />} />
        <Route path="/logins" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:cateid" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />

        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
