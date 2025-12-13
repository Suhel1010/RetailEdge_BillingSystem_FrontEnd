/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import { AppContext } from '../../Context/AppContext';
import { createOrder, deleteOrder } from '../../service/OrderService';
import './CartSummary.css';

import React, { useContext, useState } from 'react';
import { createRazorpayOrder, verifyPayment } from '../../service/PaymentService';
import { AppConstant } from '../../Utils/Constant';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';

const CartSummary = ({ mobileNumber, setMobileNumber, customerName, setCustomerName }) => {
  const { cartItem, clearCart } = useContext(AppContext);
  const totalAmount = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  const [iseProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [shoPopup, setSowPopup] = useState(false);
  const tax = totalAmount * 0.01;
  const grandTotalAmount = totalAmount + tax;

  const clearAll = () => {
    setCustomerName(''), setMobileNumber(''), clearCart();
  };
  const placeOrder = () => {
    setSowPopup(true);
    clearAll();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async orderId => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error('something went wrong !');
    }
  };

  const completePayment = async paymentMode => {
    if (!customerName || !mobileNumber) {
      toast.error('Please enter customer name.');
      return;
    }
    if (cartItem.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems: cartItem,
      subTotal: totalAmount,
      tax,
      grandTotal: grandTotalAmount,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);
    try {
      const response = await createOrder(orderData);
      const savedData = response.data;
      if (response.status === 201 && paymentMode === 'cash') {
        toast.success('cash Received');
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === 'upi') {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error('Unable to load razorpay !');
          await deleteOrderOnFailure(savedData.orderId);
          return;
        } else {
          // create razorpay order
          const razorpayResponse = await createRazorpayOrder({
            amount: grandTotalAmount,
            currency: 'INR',
          });
          const options = {
            key: AppConstant.RAZORPAY_KEY_ID,
            amount: razorpayResponse.data.amount,
            currency: razorpayResponse.data.currency,
            order_id: razorpayResponse.data.id,
            name: 'My retails shop',
            description: 'Order Payment',
            handler: async function (response) {
              await verifyPaymentHandler(response, savedData);
            },
            prefill: {
              name: customerName,
              contact: mobileNumber,
            },
            theme: {
              color: '#3399cc',
            },
            modal: {
              ondismiss: async () => {
                await deleteOrderOnFailure(savedData.orderId);
                toast.error('Payment cancelled.');
              },
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', async response => {
            await deleteOrderOnFailure(savedData.orderId);
            toast.error('Payment failed !');
            console.error(response.error.description);
          });
          rzp.open();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success('Payment successful.');
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
        //console.log('Sending to backend ===>', paymentData);
      } else {
        toast.error('Payment processing failed !');
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment failed');
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="mt-0">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-0">
          <span className="text-light">Item:</span>
          <span className="text-light">&#8377;{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-0">
          <span className="text-light">Tax (1%):</span>
          <span className="text-light">&#8377;{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Total Amount :</span>
          <span className="text-light">&#8377;{grandTotalAmount.toFixed(2)}</span>
        </div>
      </div>
      <div className="d-flex gap-2" style={{ width: '370px' }}>
        <button className="btn btn-success w-50 p-1" onClick={() => completePayment('upi')} disabled={iseProcessing}>
          {iseProcessing ? 'processing' : 'UPI'}
        </button>
        <button className="btn btn-success w-50 p-1" onClick={() => completePayment('cash')} disabled={iseProcessing}>
          {iseProcessing ? 'processing' : 'CASH'}
        </button>
      </div>
      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-warning btn-sm flex-grow-1 " onClick={placeOrder} disabled={iseProcessing || !orderDetails}>
          Place your order
        </button>
      </div>
      {shoPopup && orderDetails && (
        <ReceiptPopup
          orderDetails={{
            ...orderDetails,
            razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
            razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
            razorpaySignature: orderDetails.paymentDetails?.razorpaySignature,
          }}
          onClose={() => setSowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
