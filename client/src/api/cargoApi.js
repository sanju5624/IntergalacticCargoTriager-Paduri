import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cargo';

export const fetchCargo = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'API request failed');
  }
};
