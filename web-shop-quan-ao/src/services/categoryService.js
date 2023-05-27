import api from "./api";

const list = () => api.get(api.url.categories);
const get = (CategoryID) => api.get(`${api.url.categories}/${CategoryID}`);
const add = (data) => api.post(api.url.categories, data);
const update = (CategoryID, data) =>
  api.put(`${api.url.categories}/${CategoryID}`, data);
const remove = (CategoryID) =>
  api.delete(`${api.url.categories}/${CategoryID}`);

const categoryService = {
  list,
  get,
  add,
  update,
  delete: remove,
};
export default categoryService;
