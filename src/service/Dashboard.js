import axios from 'axios';

export const getRecentAllOrders = async () => {
  return await axios.get('http://localhost:8080/api/v1/dashboard', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
