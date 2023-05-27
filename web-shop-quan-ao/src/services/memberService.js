// import apiUser from "./apiUser";
import apiUser from "./apiUser";

// const register = (data) => apiUser.post(apiUser.url.members, data);

const register = (data) => apiUser.post(apiUser.url.register, data);
const memberlogin = (username, password) => {
  const data = { username, password };

  return apiUser.post(apiUser.url.members, data);
};
const profile = (data) => {
  return apiUser.get(apiUser.url.memberprofile, data);
};
// const get = (id) => apiUser.get(apiUser.url.members);

const memberService = {
  // add,
  register,
  memberlogin,
  profile,
};

export default memberService;
