
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'; // Import Alert from react-bootstrap

const AdminProfile = () => {
  const [admin, setAdmin] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch admin profile data
    const fetchAdminProfile = async () => {
      try {
        const adminId = localStorage.getItem('adminId');

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/profile/${adminId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const adminData = await response.json();
        setAdmin(adminData);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/edit-profile/${admin._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedAdmin = await response.json();
        setAdmin(updatedAdmin);
        setSuccessMessage('Profile updated successfully'); // Set success message
      } else {
        console.error('Failed to update admin profile');
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col lg={4} style={{ marginTop: '40px' }}>
          <div className="home-content mt-4">
            <h1 className="title">Admin Profile</h1>
            <p className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name || admin.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email || admin.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob || (admin.dob && admin.dob.substring(0, 10))}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
