import axios from 'axios';

export const createRazorpayOrder = async dataRazorpay => {
  console.log('sending create-order payload : ', dataRazorpay);
  return await axios.post(
    'http://localhost:8080/api/v1/payments/create-order',
    dataRazorpay,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  );
};

export const verifyPayment = async paymentData => {
  console.log('API CALL → /payments/verify', paymentData);
  return await axios.post(
    'http://localhost:8080/api/v1/payments/verify',
    paymentData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }
  );
};
