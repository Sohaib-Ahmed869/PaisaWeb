import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import AdminNav from '../layout/AdminNav';
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/all-categories`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            console.error('Invalid data format received:', data);
          }
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/add-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategories((prevCategories) => [...prevCategories, updatedCategory]);
        setNewCategoryName('');
      } else {
        console.error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Container>
      <AdminNav />
      <Row className="mt-5">
      <Col style={{backgroundColor:'#f4f4f4', padding:'10px'}}>
          <h2>Add New Category</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Form>
        </Col>
        <Col md={9} style={{backgroundColor:'#f4f4f4', padding:'10px',marginLeft:'4px'}}>
          <h2>All Categories</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
               
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        {/* Add Category Form */}
       
      </Row>
    </Container>
  );
};

export default CategoriesPage;
