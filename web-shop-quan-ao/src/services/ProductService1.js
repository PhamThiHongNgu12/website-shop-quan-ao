import api from "./api";
const list = () => api.get(api.url.Product);
const get = (id) => api.get(`${api.url.Product}/${id}`);
const add = (data) => api.post(api.url.Product, data);
const update = (id, data) => api.put(`${api.url.Product}/${id}`, data);
const remove = (id) => api.delete(`${api.url.Product}/${id}`);

const Productervice1 = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default Productervice1;
