import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import NoPermission from "./pages/NoPermission";
import NetworkError from "./pages/NetworkError";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminCategory from "./pages/AdminCategory";
import AdminCRUDProduct from "./pages/AdminCRUDProduct";

import Register from "./containers/Auth/Register";
import Blog from "./containers/Auth/Blog";

const routes = [
  { path: "", component: <Home /> },
  //page
  { path: "home", component: <Home /> },
  { path: "product", component: <Product /> },
  { path: "product/:cateid", component: <Product /> },
  { path: "cart", component: <Cart /> },
  { path: "/product-detail", component: <ProductDetail /> },
  { path: "/blog", component: <Blog /> },

  // error
  { path: "/not-found", component: <NotFound /> },
  { path: "/network-error", component: <NetworkError /> },
  { path: "/no-permission", component: <NoPermission /> },

  //admin
  { path: "/product-admin", component: <AdminCRUDProduct /> },
  { path: "/category", component: <AdminCategory /> },
];

export default routes;
