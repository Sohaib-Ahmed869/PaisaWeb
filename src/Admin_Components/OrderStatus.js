import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Table } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearch } from 'react-icons/bi'; // Import the search icon
import AdminNav from '../layout/AdminNav';
// Set the
const URL = process.env.REACT_APP_BACKEND_URL;

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [status, setStatus] = useState('');
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await fetch(`${URL}/admin/unconfirmed-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const customersResponse = await fetch(`${URL}/admin/all-customers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const productsResponse = await fetch(`${URL}/admin/all-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (ordersResponse.ok && customersResponse.ok && productsResponse.ok) {
          const ordersData = await ordersResponse.json();
          const customersData = await customersResponse.json();
          const productsData = await productsResponse.json();

          setOrders(ordersData);
          console.log(ordersData);
          setCustomers(customersData.reduce((acc, customer) => {
            acc[customer._id] = customer.name;
            return acc;
          }, {}));
          setProducts(productsData.reduce((acc, product) => {
            acc[product._id] = product.name;
            return acc;
          }, {}));
          console.log(productsData);
        } else {
          console.error('Failed to fetch orders, customers, or products');
        }
      } catch (error) {
        console.error('Error fetching orders, customers, or products:', error);
      }
    };

    fetchOrders();
  }, []);

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
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newOrderStatus } : order
          )
        );
        console.log(orders);
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const [filteredOrders, setFilteredOrders] = useState([]);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    if(orders.length == 0){
      return;
    }
    if (orders.length != 0) {
      setFilteredOrders(orders.filter((order) =>
        customers[order.customer].toLowerCase().includes(searchTerm.toLowerCase())
      )
      );
    }

  }




  return (
    <React.Fragment>
      <AdminNav />
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <h2 style={{ marginLeft: '-10px' }}>Manage Orders</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && <tr><td colSpan="5">No orders</td></tr>}


              {
                orders.length > 0 &&

                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.customerName}</td>
                    <td>
                      <select 
                      className="form-control"
                      
                      onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                      >
                        <option>{order.status}</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Cancelled</option>
                        <option>Delivered</option>
                      </select>
                    </td>

                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default OrderStatus;
