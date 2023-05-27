import api from "./api";

const list = () => api.get(api.url.products);
const getPaging = (pageNum, pageLength, searchText) => {
  let queryString = `?page=${pageNum}&pageLength=${pageLength}`;
  if (searchText) queryString += `&q=${searchText}`;
  return api.get(`${api.url.products}/get-paging${queryString}`);
};
const getPagingByCategory = (cateid, pageNum, pageLength, searchText) => {
  let queryString = `?page=${pageNum}&pageLength=${pageLength}`;
  if (searchText) queryString += `&q=${searchText}`;
  return api.get(`${api.url.products}/get-by-category/${cateid}${queryString}`);
};
const get = (ProductID) => api.get(`${api.url.products}/${ProductID}`);

const add = (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(api.url.products, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const update = (ProductID, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(`${api.url.products}/update/${ProductID}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const remove = (ProductID) => api.delete(`${api.url.products}/${ProductID}`);

// const getImageUrl = (ProductID) =>
//   api.get(`${api.url.products}/image-url/${ProductID}`);
// const getImageBase64 = (ProductID) =>
//   api.get(`${api.url.products}/image-base64/${ProductID}`);

// http://localhost/clotheshop/public/data/images/2_hinh_nen_phong_canh (1)-2_1682501318.jpg
const downloadImage = (ProductID) =>
  api.get(`${api.url.products}/download-image/${ProductID}`, {
    responseType: "blob",
  });

const productService = {
  list,
  getPaging,
  getPagingByCategory,
  get,
  // getImageUrl,
  // getImageBase64,

  add,
  update,
  delete: remove,
  downloadImage,
};
export default productService;
