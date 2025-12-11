import { latestOrder } from '../../service/OrderService';
import './OrderHistory.css';

import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // foe make slow api
        const response = await latestOrder();
        console.log('babu :', response.data);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatItems = items => {
    return items.map(item => `${item.name} * ${item.quantity}`).join(',');
  };

  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div className="text-center py-4"> Loading orders .....</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-4"> Orders not found</div>;
  }

  return (
    <div className="orders-history-container">
      <h2 className="mt-2 mb-0 text-dark text-center">All orders</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>OrderId</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  {order.customerName}
                  <br />
                  <small className="text-muted">{order.phoneNumber}</small>
                </td>
                <td>{formatItems(order.items)}</td>
                <td>{order.grandTotal}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span
                    className={`badge ${
                      order.paymentDetails?.paymentStatus?.trim() ===
                      'Completed'
                        ? 'bg-success'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {order.paymentDetails?.paymentStatus || 'PENDING'}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
