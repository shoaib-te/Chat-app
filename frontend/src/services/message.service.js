import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'API communication error';
  throw new Error(message);
};

// Get all message-related users
export const getAllUsers = async () => {
  try {
    const response = await API.get('/api/message/user');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get a specific message conversation by user ID
export const getAllMessages = async (userId) => {
  try {
    const response = await API.get(`/api/message/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Send a new message to a specific user
export const sendMessage = async (userId,fromdata) => {
  try {
    const response = await API.post(`/api/message/send/${userId}`,fromdata);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Mark a message as read/updated
export const markMessage = async (messageId) => {
  try {
    const response = await API.put(`/api/message/mark/${messageId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
