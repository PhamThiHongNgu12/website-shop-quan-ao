import axios from "axios";
import store from "../store";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const url = {
  baseUrl: "http://localhost/clotheshop/public/api",
  login: "/login",
  categories: "/categories",
  products: "/products",
  // members: "/members/login",
  // memberprofile: "/members/profile",
  // register: "/members/register",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState(); //grab curent state
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  store.dispatch(showLoading());
  return request;
});

// instance.interceptors.request.use((request) => request);
instance.interceptors.response.use(
  (response) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);
    return response.data;
  },
  (error) => {
    if (!error.response) {
      window.location.href = "/network-error";
    } else {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";

          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
  promise: axios.all,
  spread: axios.spread,
};

export default api;
