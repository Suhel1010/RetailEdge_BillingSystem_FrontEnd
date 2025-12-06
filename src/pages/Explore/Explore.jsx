import React, { useContext, useState } from 'react';
import './Explore.css';
import { AppContext } from '../../Context/AppContext';
import DisplayItem from '../../component/DisplayItems/DisplayItem';
import DisplayCategory from '../../component/DisplayCategory/DisplayCategory';
import CustomerForm from '../../component/CustomerForm/CustomerForm';
import CartItems from '../../component/CartItems/CartItems';
import CartSummary from '../../component/CartSummary/CartSummary';
const Explore = () => {
  const [selectedCategories, setSelectedCategories] = useState(null);
  const { categories } = useContext(AppContext);
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: 'auto' }}>
          <DisplayCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories}
          />
        </div>
        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: 'auto' }}>
          <DisplayItem selectedCategories={selectedCategories} />
        </div>
      </div>
      <div className="right-column">
        <div className="customer-form-container" style={{ height: '15%' }}>
          <CustomerForm
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </div>
        <hr className="my-3 text-light" />
        <div
          className="cart-item-container"
          style={{ height: '53%', overflowY: 'auto' }}
        >
          <CartItems />
        </div>
        <div className="cart-summary-container" style={{ height: '30%' }}>
          {' '}
          <CartSummary
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
