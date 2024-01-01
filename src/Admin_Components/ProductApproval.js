import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import AdminNav from '../layout/AdminNav';
const URL = process.env.REACT_APP_BACKEND_URL;

const UnapprovedProducts = () => {
  const [unapprovedProducts, setUnapprovedProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUnapprovedProducts = async () => {
      try {
        const response = await fetch(`${URL}/admin/unapproved-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnapprovedProducts(data);
        } else {
          console.error('Failed to fetch unapproved products');
          console.log(await response.text());
        }
      } catch (error) {
        console.error('Error fetching unapproved products:', error);
      }
    };

    fetchUnapprovedProducts();
  }, []);

  const handleApproveClick = async (productId) => {
    try {
      const response = await fetch(
        `${URL}/admin/approve-product/${productId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ approval: true }),
        }
      );

      if (response.ok) {
        setUnapprovedProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        console.error('Failed to approve product');
      }
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };

  return (
    <div>
      <React.Fragment>
        <AdminNav />
        <Container style={{ marginTop: '50px' }}>
          <Row className="justify-content-md-center">
            <Col md={8} lg={8}></Col>
            <Col md={8} style={{ marginTop: '50px' }}>
              <h2>Unapproved Products</h2>
              {unapprovedProducts.length === 0 ? (
                <p>No products</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unapprovedProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>
                          {product.approval ? 'Approved' : 'Not Approved'}
                        </td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => handleApproveClick(product._id)}
                          >
                            Approve
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default UnapprovedProducts;
