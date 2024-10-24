import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

// const getOrder = async (id) => {
//   const response = await axios.post(
//     `${base_url}user/getorderbyuser/${id}`,
//     "",
//     config
//   );
//   return response.data;
// };

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getorderbyuser/${id}`,
    config
  );
  return response.data;
};

const getOrderById = async (orderId) => {
  const response = await axios.get(
    `${base_url}orders/getOrderById/${orderId}`,
    config
  );
  return response.data;
};


const updateOrderStatus = async ({ orderId, status }) => {
  const response = await axios.put(
    `${base_url}orders/update-order-status`,
    { orderId, status },
    config
  );
  console.log("API response:", response.data); 
  return response.data;
};

const updateProduct = async (productData) => {
  const response = await axios.put(
    `${base_url}product/${productData.id}`,
    productData,
    config
  );
  return response.data;
};

const confirmDelivery = async (orderId, confirmationCode) => {
  const response = await axios.post(
    `${base_url}orders/confirm-delivery`,
    { orderId, confirmationCode },
    config
  );
  return response.data;
};

// const getTotalIncome = async () => {
//   const response = await axios.get(`${base_url}orders/gettotalincome`, config);
//   return response.data;
// };

const getTotalIncome = async () => {
  const response = await axios.get(`${base_url}orders/gettotalincome`, config);
  return response.data.totalIncome; // Make sure this matches your API response structure
};


const authService = {
  login,
  getOrders,
  getOrder,
  updateOrderStatus,
  confirmDelivery,
  getTotalIncome,
  updateProduct,
  getOrderById
};

export default authService;