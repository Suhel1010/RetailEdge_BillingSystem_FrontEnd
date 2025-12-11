/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import { getRecentAllOrders } from '../../service/Dashboard';
import toast from 'react-hot-toast';
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getRecentAllOrders();
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong !!');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="my-3 loading">Loading dashboard ..........</div>;
  }

  if (!data) {
    return (
      <div className="my-3 error">Failed to load the dashboard data !!</div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="status-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>
            <div className="stat-content">
              <h3>Today's sales</h3>
              <p>₹{(data.todaySales || 0).toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount}</p>
            </div>
          </div>
        </div>
        <div className="recent-orders-card">
          <h3 className="recent-order-title">
            <i className="bi bi-clock-history"></i>
            Recent Orders
          </h3>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead className="">
                <tr>
                  <th>OrderId</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}.....</td>
                    <td>{order.customerName}</td>
                    <td>{order.grandTotal.toFixed(2)}</td>
                    <td>
                      <span
                        className={`payment-method ${order.paymentMethod.toLowerCase()}`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${order.paymentDetails.paymentStatus.toLowerCase()}`}
                      >
                        {order.paymentDetails.paymentStatus}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
