import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_URL;

const UnapprovedProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [unapprovedProducts, setUnapprovedProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${URL}/admin/all-products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllProducts(data);
          // Filter unapproved products
          const unapproved = data.filter((product) => !product.approval);
          setUnapprovedProducts(unapproved);
        } else {
          console.error('Failed to fetch all products');
          console.log(await response.text());
        }
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    fetchAllProducts();
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
        <Container>
          <Row>
            <Col md={8} lg={8}></Col>
            <Col md={8} style={{ marginTop: '50px' }}>
              <h2>All Products</h2>
              {allProducts.length === 0 ? (
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
                    {allProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>
                          {product.approval ? 'Approved' : 'Not Approved'}
                        </td>
                        {product.approval ? (
                          <td> Approved</td>
                        ) : (
                          <td>
                            <Button
                              variant="success"
                              onClick={() => handleApproveClick(product._id)}
                            >
                              Approve
                            </Button>
                          </td>
                        )}
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
