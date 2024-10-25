// import axios from "axios";
// import { config } from "../../utils/axiosconfig";
// import { base_url } from "../../utils/baseUrl";

// const getProducts = async () => {
//   const response = await axios.get(`${base_url}product/`);

//   return response.data;
// };
// const createProduct = async (product) => {
//   const response = await axios.post(`${base_url}product/`, product, config);

//   return response.data;
// };
// const updateProduct = async (productData) => {
//   const response = await axios.put(
//     `${base_url}product/${productData.id}`,
//     { isFinalSale: productData.isFinalSale },
//     config
//   );
//   return response.data;
// };

// const deleteProduct = async (id) => {
//   const response = await axios.delete(`${base_url}product/${id}`, config);
//   return response.data;
// };


// const productService = {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };

// export default productService;











import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

const updateProduct = async (productData) => {
  const response = await axios.put(
    `${base_url}product/${productData.id}`,
    { isFinalSale: productData.isFinalSale },
    config
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
};

export default productService;
