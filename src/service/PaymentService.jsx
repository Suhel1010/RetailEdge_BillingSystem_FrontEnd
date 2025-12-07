import axios from 'axios';

export const createRazorpayOrder = async dataRazorpay => {
  return await axios.post(
    'http://localhost:8080/api/v1/payments/create-order',
    dataRazorpay,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  );
};

export const verifyPayment = async paymentData => {
  return await axios.post(
    'http://localhost:8080/api/v1/payments/verify',
    paymentData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  );
};
