import React, { useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(password, email);
    
        try {
            const response = await fetch(`${URL}/user/signin/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    email,
                }),
            });
    
            const responseData = await response.json();
            console.log(responseData);
    
            if (response.ok) {

                localStorage.setItem('token', responseData.token);
                localStorage.setItem('adminId', responseData.admin._id); // Assuming the admin ID is in the result
               
                // Redirect to dashboard
                window.location.href = '/admin-dashboard';
                
            } else {
                console.error('Login failed:', responseData.error);
            }
        } catch (err) {
            console.error(err, 'error');
        }
    };

    return (
        <React.Fragment>
          
            <Container>
                <Row className="align-items-center">
                    <Col lg={4}>
                        <div className="home-content mt-4">
                            <h1 className="title">Sign In</h1>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className="signup-form mt-4">
                            <form action="#" className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                                <Row>
                                    <Col lg={6} className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <div className="d-flex justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Remember Me
                                                </label>
                                            </div>
                                            <Link to="/forgotpassword" className="text-decoration-none">Forgot Password?</Link>
                                        </div>
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                                            Sign In
                                        </button>
                                    </Col>
                                    <Col lg={12}>
                                        <p className="text-center">
                                            Don't have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
                                        </p>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default AdminLogin;