// import apiUser from "./apiUser";
import store from "../store";
import apiUser from "./apiUser";
import Header from "./../containers/Header/Header";

// const register = (data) => apiUser.post(apiUser.url.members, data);

const register = (data) => apiUser.post(apiUser.url.membersRegister, data);
const memberlogin = (username, password) => {
  const data = { username, password };

  return apiUser.post(apiUser.url.members, data);
};
const profile = () => {
  return apiUser.get(apiUser.url.memberprofile);
};

// const addCart = (data) => apiUser.post(apiUser.url.addcart, data);
// const get = (id) => apiUser.get(apiUser.url.members);

const memberService = {
  // add,
  register,

  memberlogin,
  profile,
};

export default memberService;
