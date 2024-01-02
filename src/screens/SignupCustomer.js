import React from "react";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const CustomerSignup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/user/signup/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password, confirm_password, dob, type: 'customer'
                })
            });

            const responseData = await response.json();
            console.log(responseData);

            if(response.ok) {
                // Redirect to dashboard
                window.location.href = '/signin/customer';
            }
            else {
                alert('Sign up failed');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <section id="home-1" style={{ textAlign: 'left', paddingTop: '100px' }}>
                <section className='home-2'>
                    <div className="box">
                        <div className="wave -one"></div>
                        <div className="wave -two"></div>
                        <div className="wave -three"></div>
                    </div>
                </section>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={4}>
                            <div className="home-content mt-4">
                                <h1 className="title">Sign Up</h1>
                                <p className="subtitle">Dign up as a customer for Paisa Pk. World's best fashion store.</p>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="signup-form mt-4">
                                <form
                                    action="#"
                                    className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                                    <Row>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Enter name"
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Enter email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Enter password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="confirm_password">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirm_password"
                                                    placeholder="Confirm password"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="dob"
                                                >
                                                    Date of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="dob"
                                                    placeholder="Enter date of birth"
                                                    onChange={(e) => setDob(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group text-center mt-4">
                                                <button

                                                    className="btn btn-primary"
                                                    onClick={submitHandler}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}

export default CustomerSignup;