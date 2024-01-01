import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi'; // Import the search icon
import AdminNav from '../layout/AdminNav';

const URL = process.env.REACT_APP_BACKEND_URL;

const BlockCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${URL}/admin/all-customers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleBlockStatusChange = async (customerId, newBlockStatus) => {
    try {
      const response = await fetch(`${URL}/admin/customer-block-status/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ block: newBlockStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === customerId ? { ...customer, block: newBlockStatus } : customer
          )
        );
      } else {
        console.error('Failed to update customer block status');
      }
    } catch (error) {
      console.error('Error updating customer block status:', error);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <React.Fragment>
      <AdminNav />
      <Container style={{ marginTop: '50px' }}>
        <Row className="justify-content-md-center">
          
          <Col lg={8}>
          
              <div className="home-content mt-5">
                <h1 className="title">Customer List</h1>
                <p className="subtitle">List of customers</p>
              </div>
              {/* Search bar */}
            
             <Form  >
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
             
          
              
              <Table striped bordered hover style={{marginTop:'1px'}}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th style={{ width: '120px' }}>Status</th>
                    <th style={{ width: '150px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td style={{ color: customer.block ? 'red' : 'green', fontWeight: 'bolder', paddingTop: '12px' }}>
                        {customer.block ? 'Blocked' : 'Not Blocked'}
                      </td>
                      <td>
                        <Button style={{ width: '100px' }}
                          variant={customer.block ? 'primary' : 'primary'}
                          onClick={() => handleBlockStatusChange(customer._id, !customer.block)}
                        >
                          {customer.block ? 'Unblock' : 'Block'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
       
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default BlockCustomer;
