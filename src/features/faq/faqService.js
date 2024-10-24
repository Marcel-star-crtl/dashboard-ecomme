import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getFAQs = async () => {
  const response = await axios.get(`${base_url}faq/`);
  return response.data;
};

const createFAQ = async (faq) => {
  const response = await axios.post(`${base_url}faq/`, faq, config);
  return response.data;
};

const updateFAQ = async (faqData) => {
  const response = await axios.put(
    `${base_url}faq/${faqData.id}`,
    { question: faqData.question, answer: faqData.answer },
    config
  );
  return response.data;
};

const deleteFAQ = async (id) => {
  const response = await axios.delete(`${base_url}faq/${id}`, config);
  return response.data;
};

const getFAQ = async (id) => {
  const response = await axios.get(`${base_url}faq/${id}`, config);
  return response.data;
};

const faqService = {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQ,
};

export default faqService;
