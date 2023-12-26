import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from "swiper";

const URL = process.env.REACT_APP_BACKEND_URL;
const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [type, setType] = useState('');

    const submitHandler = async (e) => {
        console.log('Type', type)
        console.log (name, email, password, confirm_password, dob, type);
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
        }
        catch (err) {
            console.log(err);
        }
    }
    
    
    return (
        <React.Fragment>
                <section id="home" style={{textAlign: 'left', paddingTop: '100px'}}>
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={4}>
                                <div className="home-content mt-4">
                                    <h1 className="title">Sign Up</h1>
                                    <p className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </Col>
                            <Col lg={8}>
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