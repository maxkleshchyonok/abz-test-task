import { API_CONFIG } from "./config";
import axios from "axios";

if (!API_CONFIG.baseURL) {
  throw new Error("API_CONFIG.baseURL is required");
}

// Create axios instance with default config
const axiosInstance = axios.create(API_CONFIG);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add additional request handling here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const customError = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
    return Promise.reject(customError);
  }
);

export const apiClient = {
  get: async (endpoint, params) => {
    try {
      return await axiosInstance.get(endpoint, params);
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      return await axiosInstance.post(endpoint, data);
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      return await axiosInstance.put(endpoint, data);
    } catch (error) {
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      return await axiosInstance.delete(endpoint);
    } catch (error) {
      throw error;
    }
  },
};
