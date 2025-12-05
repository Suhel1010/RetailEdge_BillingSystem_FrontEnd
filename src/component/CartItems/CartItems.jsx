import { AppContext } from '../../Context/AppContext';
import './CartItems.css';

import React, { useContext } from 'react';

const CartItems = () => {
  const { cartItem, removeCart, updateCart } = useContext(AppContext);

  return (
    <div className="p-3 h-100 overflow-y-auto">
      {cartItem.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-light text-center">Your cart is empty </p>
        </div>
      ) : (
        <div className="cart-item-list ">
          {cartItem.map((itemData, index) => (
            <div key={index} className="cart-item mb-2 p-3 bg-black rounded">
              <div className="d-flex justify-content-between align-items-center mb-0">
                <h6 className="text-light mb-3">{itemData.name}</h6>
                <p className="text-light">
                  &#8377;{(itemData.price * itemData.quantity).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2 mb-0 mt-0">
                  <button
                    className="btn btn-danger  btn-sm"
                    onClick={() =>
                      updateCart(itemData.itemId, itemData.quantity - 1)
                    }
                    disabled={itemData.quantity == 1}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="text-light">{itemData.quantity}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      updateCart(itemData.itemId, itemData.quantity + 1)
                    }
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm "
                  style={{ width: 'auto' }}
                  onClick={() => removeCart(itemData.itemId)}
                >
                  <i className=" bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
