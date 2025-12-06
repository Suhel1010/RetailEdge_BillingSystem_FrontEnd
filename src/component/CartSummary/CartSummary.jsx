import { AppContext } from '../../Context/AppContext';
import './CartSummary.css';

import React, { useContext } from 'react';

const CartSummary = (
  mobileNumber,
  setMobileNumber,
  customerName,
  setCustomerName
) => {
  const { cartItem } = useContext(AppContext);
  const totalAmount = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.01;
  const grandTotalAmount = totalAmount + tax;

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
          <span className="text-light">
            &#8377;{grandTotalAmount.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="d-flex gap-2" style={{ width: '370px' }}>
        <button className="btn btn-success w-50 p-1">UPI</button>
        <button className="btn btn-success w-50 p-1">Cash</button>
      </div>
      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-warning btn-sm flex-grow-1 ">
          Place your order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
