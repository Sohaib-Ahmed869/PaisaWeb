import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from "swiper";


import logo from '../images/logo.png';

const URL = process.env.REACT_APP_BACKEND_URL;
const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [type, setType] = useState('Admin');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Type', type)
        console.log(name, email, password, confirm_password, dob, type);
        try {

            const response = await fetch(`${URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password, dob, type
                })
            });

            const responseData = await response.json();
            console.log(responseData);

            alert('Sign up successful');    
            if(response.ok) {
                // Redirect to dashboard
                
                window.location.href = '/signin/customer';
            }
            else {
                alert('Sign up failed');
                console.error('Sign up failed:', responseData.error);
            }


        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <React.Fragment>

            <section className="bg-home bg-circle-gradiant d-flex align-items-center"  id="home">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div>
                                <img src={logo} alt="" style={{ width: '200px' }} />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="home-content mt-4">
                                <h1 className="title">Welcome to Paisa PK.</h1>
                                <p className="subtitle">The fashion world is at your fingertips.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section id="home" style={{ textAlign: 'left' }}>
                <Container>
                    <section className="home-2 home-slider" style={{ height: '10vh' }}>
                        <div className="box" style={{ height: '10vh' }}>
                            <div className="wave -one"></div>
                            <div className="wave -two"></div>
                            <div className="wave -three"></div>
                        </div>
                    </section>
                    <Row className="align-items-center">
                        <Col lg={12}>
                            <div className="signup-form mt-4">
                                <form action="#" className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                                    <Row>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="type">Type</label>
                                                <select className="form-control" id="type" onChange={(e) => setType(e.target.value)}>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Super Admin">Super Admin</option>
                                                    <option value="Seller">Seller</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="dob">Date of Birth</label>
                                                <input type="date" className="form-control" id="dob" placeholder="Enter your date of birth" onChange={(e) => setDob(e.target.value)} />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <div className="form-group">
                                                <label htmlFor="confirm_password">Confirm Password</label>
                                                <input type="password" className="form-control" id="confirm_password" placeholder="Enter your confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </div>
                                        </Col>


                                        <Col lg={12}>
                                            <div className="form-group text-center mt-4">
                                                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Sign Up</button>
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

export default Signup;