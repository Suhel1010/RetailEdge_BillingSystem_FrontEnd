import React, { useContext } from 'react';
import './Explore.css';
import { AppContext } from '../../Context/AppContext';
const Explore = () => {
  const { categories } = useContext(AppContext);
  console.log(categories);

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: 'auto' }}>
          first row
        </div>
        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: 'auto' }}>
          second row
        </div>
      </div>
      <div className="right-column">
        <div className="customer-form-container" style={{ height: '15%' }}>
          customer form
        </div>
        <hr className="my-3 text-light" />
        <div
          className="cart-item-container"
          style={{ height: '55%', overflowY: 'auto' }}
        >
          cart item
        </div>
        <div className="cart-summary-container" style={{ height: '30%' }}>
          {' '}
          cart summaryy
        </div>
      </div>
    </div>
  );
};

export default Explore;
