import axios from "axios";

const API_URL = "http://localhost:4000";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, userData);
    return response.data; 
  } catch (error) {
    return { error: error.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, userData);
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken); 
    }
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed" };
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "Unauthorized" };
    }

    const response = await axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Failed to fetch users" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token"); 
};
