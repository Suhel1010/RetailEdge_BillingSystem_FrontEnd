import axios from 'axios';

export const addItem = async item => {
  return await axios.post('http://localhost:8080/api/v1/admin/items', item, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const deleteItem = async itemId => {
  return await axios.delete(`http://localhost:8080/api/v1/admin/${itemId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const getItem = async () => {
  return await axios.get('http://localhost:8080/api/v1/items', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
