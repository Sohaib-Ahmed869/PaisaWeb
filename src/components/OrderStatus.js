import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Table } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearch } from 'react-icons/bi'; // Import the search icon

// Set the
const URL = process.env.REACT_APP_BACKEND_URL;

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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
          setCustomers(customersData.reduce((acc, customer) => {
            acc[customer._id] = customer.name;
            return acc;
          }, {}));
          setProducts(productsData.reduce((acc, product) => {
            acc[product._id] = product.name;
            return acc;
          }, {}));
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
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    customers[order.customer].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <React.Fragment>
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <h2 style={{ marginLeft: '-10px' }}>Manage Orders</h2>
          <Form className="mb-4" style={{}}>
            <InputGroup>
            <Form.Control
                type="text"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
                <Button variant="outline-secondary">
                  <BiSearch /> {/* Search icon */}
                </Button>
            </InputGroup>
             
             
           
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{customers[order.customer]}</td>
                  <td>{order.products.map((productId) => products[productId]).join(', ')}</td>
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
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default OrderStatus;
