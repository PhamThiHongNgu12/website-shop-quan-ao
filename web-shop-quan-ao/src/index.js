import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main_styles.css";
import "./styles/responsive.css";
// import "bootstrap/dist/js/jquery-3.2.1.min";
import "bootstrap/dist/js/jquery-3.2.1.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";
import store, { persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingBar } from "react-redux-loading-bar";
import { CartProvider } from "react-use-cart";

const container = document.getElementById("root");
const root = createRoot(container);
// const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <PersistGate loading={null} persistor={persistor}>
          <div className="fixed-top w-100" style={{ zIndex: 100 }}>
            <LoadingBar
              updateTime={100}
              className="bg-danger"
              style={{ height: "2px" }}
            />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <App />
        </PersistGate>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
