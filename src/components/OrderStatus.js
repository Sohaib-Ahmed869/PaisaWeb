// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

// Set the backend API URL
const URL = process.env.REACT_APP_BACKEND_URL;

// Create the component
const OrderStatus = () => {
  // State to store the list of orders
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${URL}/admin/unconfirmed-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle status change
  const handleOrderStatusChange = async (orderId, newOrderStatus) => {
    try {
      const response = await fetch(`${URL}/admin/confirm-order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderStatus: newOrderStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newOrderStatus } : order
          )
        );
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Order Status</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>{order.products.join(', ')}</td>
              <td>{order.orderStatus ? 'Confirmed' : 'Pending'}</td>
              <td>
                <Button
                  variant={order.orderStatus ? 'success' : 'primary'}
                  onClick={() => handleOrderStatusChange(order._id, !order.orderStatus)}
                  disabled={order.orderStatus}
                >
                  Confirm
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderStatus;
