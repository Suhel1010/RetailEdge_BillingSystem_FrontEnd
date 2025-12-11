/* eslint-disable react/prop-types */
import './ReceiptPopup.css';
import React from 'react';
import './Print.css';

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="d-flex justify-content-center align-items-center animated-check mb-0">
          <i className="bi bi-check-circle-fill text-success fs-1 "></i>
        </div>
        <h3 className="text-center mb-4">Order Receipt</h3>
        <p className="mb-0">
          <strong>Name : </strong>
          {orderDetails.customerName}
        </p>
        <p className="mb-0">
          <strong>Mobile No. : </strong>
          {orderDetails.phoneNumber}
        </p>
        <p className="mb-0">
          <strong>Order Id : </strong>
          {orderDetails.orderId}
        </p>
        <hr className="my-2" />
        <h5 className="mb-2">Items Ordered</h5>
        <div className="cart-items-scrollable">
          {orderDetails.items.map((item, index) => (
            <div key={index} className="d-flex justify-content-between mb-1">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>&#8377;{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between mb-1">
          <span>
            <strong>Subtotal:</strong>
          </span>
          <strong>&#8377;{orderDetails.subTotal.toFixed(2)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span>
            <strong>Tax(1%):</strong>
          </span>
          <strong>&#8377;{orderDetails.tax.toFixed(2)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span>
            <strong>Grand Total :</strong>
          </span>
          <strong>&#8377;{orderDetails.grandTotal.toFixed(2)}</strong>
        </div>
        <p className="my-3 mb-0">
          <strong>Payment Method :</strong> {orderDetails.paymentMethod}
        </p>
        {orderDetails.paymentMethod === 'UPI' && (
          <>
            <p className="mb-0">
              <strong>Razorpay Order ID :</strong>
              {orderDetails.razorpayOrderId}
            </p>
            <p className="mb-1">
              <strong>Razorpay Payment ID :</strong>
              {orderDetails.razorpayPaymentId}
            </p>
          </>
        )}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className="btn btn-warning" onClick={onPrint}>
            Print Receipt
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReceiptPopup;
