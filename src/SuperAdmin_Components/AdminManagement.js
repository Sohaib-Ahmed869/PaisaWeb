import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'react-bootstrap';
import { useEffect } from 'react';
import Footer from '../layout/footer';
const url = process.env.REACT_APP_BACKEND_URL
const AdminPage = () => {
  const [showAddAdminForm, setShowAddAdminForm] = useState(true);
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual server URL
      const apiUrl = `${url}SuperAdmin/addAdmin`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Handle the success message
      } else {
        console.error('Failed to add admin');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form and hide it after submission
    setAdminData({
      name: '',
      email: '',
      password: '',
      dob: '',
    });
    setShowAddAdminForm(false);
  };

  return (
    <React.Fragment>
      <section className='home-1 home-2 bg-light justify-content-center'>
        <Container>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="sec-hd">
                  <span className="heading"></span>
                  <h2 className="sec-title mt-4">Admin Management</h2>
                  <span className="heading"></span>
                </div>
              </Col>
            </Row>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {showAddAdminForm && (
                <div>
                  <form className='form' onSubmit={handleFormSubmit}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={adminData.name}
                        onChange={handleInputChange}
                        required
                        className='form-control'

                      />
                    </label>
                    <br />
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={adminData.email}
                        onChange={handleInputChange}
                        required
                        className='form-control'
                      />
                    </label>
                    <br />
                    <label>
                      Password:
                      <input
                        type="password"
                        name="password"
                        value={adminData.password}
                        onChange={handleInputChange}
                        required
                        className='form-control'

                      />
                    </label>
                    <br />
                    <label>
                      Date of Birth:
                      <input
                        type="date"
                        name="dob"
                        value={adminData.dob}
                        onChange={handleInputChange}
                        required
                        className='form-control'

                      />
                    </label>
                    <br />
                    <button type="submit" className="btn btn-primary mt-3">
                      Add Admin
                    </button>
                  </form>
                </div>
              )}

            </div>
        </Container>

      </section>
      <Footer />
    </React.Fragment>
  );
};


export default AdminPage;
