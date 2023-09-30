import apiUser from "./apiUser";
const getCart = (MemberID) => apiUser.get(`${apiUser.url.getCart}/${MemberID}`);

const addCart = (data) => {
  apiUser.post(apiUser.url.addcart, data);
};
const remove = (id) => apiUser.delete(`${apiUser.url.deleteCart}/${id}`);
const cartService = {
  getCart,
  addCart,
  delete: remove,
};
export default cartService;
