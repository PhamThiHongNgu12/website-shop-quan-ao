import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./containers/Header/DefaultLayout";
import Login from "./containers/Auth/Login";
import Admin from "./containers/Auth/Admin";
import Home from "./pages/Home";
import Register from "./containers/Auth/Register";
import Product from "./pages/Product";
import Blog from "./containers/Auth/Blog";
// import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:cateid" element={<Product />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
