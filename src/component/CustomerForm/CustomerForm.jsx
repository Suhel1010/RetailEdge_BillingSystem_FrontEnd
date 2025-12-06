/* eslint-disable react/prop-types */
import './CustomerForm.css';

import React from 'react';

const CustomerForm = ({
  mobileNumber,
  setMobileNumber,
  customerName,
  setCustomerName,
}) => {
  return (
    <div className="p-3">
      <div className="mb-2">
        <div className="d-flex align-items-center gap-2 ">
          <label
            htmlFor="customerName"
            className="col-4"
            style={{ height: '100%', width: '35%' }}
          >
            Customer Name
          </label>
          <input
            type="text"
            className="form-control "
            id="customerName"
            style={{ height: '27px', width: '100%' }}
            onChange={e => setCustomerName(e.target.value)}
            value={customerName}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2 ">
          <label
            htmlFor="customerName"
            className="col-4"
            style={{ height: '100%', width: '35%' }}
          >
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control "
            id="mobileNo"
            style={{ height: '27px', width: '100%' }}
            onChange={e => setMobileNumber(e.target.value)}
            value={mobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
