import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultNavbar from "../layout/DefaultNav";
import Footer from "../layout/footer";
import {
    Row,
    Col,
    Container,
    Badge
} from 'react-bootstrap';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from "swiper";
import Features from "../layout/Feature";
import Contact from "../layout/Map";

import hoodie1 from "../assets/hoodie1.png";
import jacket1 from "../assets/jacket1.png";
import jacket2 from "../assets/jacket2.png";
import shirt1 from "../assets/shirt1.png";

const Home = () => {
    
    return (
        <React.Fragment>
            <DefaultNavbar />
            <section className="home-1 home-2 bg-home d-flex align-items-center bg-light" id="home" style={{ height: '100vh' }}>

                <div className="box">
                    <div className="wave -one"></div>
                    <div className="wave -two"></div>
                    <div className="wave -three"></div>
                </div>
                <Container>
                    <Row className="align-items-center justify-content-between">
                        <Col md={6}>
                            <div className="home-heading">
                                <Badge bg="soft-primary" className="rounded-pill mb-3">Fashion Store</Badge>
                                <h3>Paisa.PK</h3>
                                <p className="home-title"></p>
                                <p className="text-muted">The fashion world is at your fingertips.
                                    Get the most out of your shopping experience with the Paisa.PK app. Enjoy exclusive app-only offers and discounts, and hassle-free payment options.
                                </p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="swiper swiper-container homeSwiper">
                                <div className="swiper-wrapper">
                                    <Swiper
                                        loop={true}
                                        effect={"coverflow"}
                                        spaceBetween={50}
                                        centeredSlides={true}
                                        slidesPerView={2}
                                        speed={5000}
                                        autoplay={{
                                            delay: 500,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[EffectCoverflow, Autoplay]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide className="swiper-slide border-radius">
                                            <div className="app-screenshot-item text-center d-flex justify-content-center">
                                                <div className="app-screenshot-overlayer">
                                                    <Link className="mfp-image img-fluid" to={hoodie1} title=""></Link>
                                                </div>
                                                <div className="screenshot-img">
                                                    <Link to={hoodie1} className="lightbox img-fluid">
                                                        <img src={hoodie1} alt="" className='img-fluid' />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide border-radius">
                                            <div className="app-screenshot-item text-center d-flex justify-content-center">
                                                <div className="app-screenshot-overlayer">
                                                    <Link className="mfp-image img-fluid" to={jacket1} title=""></Link>
                                                </div>
                                                <div className="screenshot-img">
                                                    <Link to={jacket1} className="lightbox img-fluid">
                                                        <img src={jacket1} alt="" className="img-fluid" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide border-radius">
                                            <div className="app-screenshot-item text-center d-flex justify-content-center">
                                                <div className="app-screenshot-overlayer">
                                                    <Link className="mfp-image img-fluid" to={jacket2} title=""></Link>
                                                </div>
                                                <div className="screenshot-img">
                                                    <Link to={jacket2} className="lightbox img-fluid">
                                                        <img src={jacket2} alt="" className="img-fluid" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide border-radius">
                                            <div className="app-screenshot-item text-center d-flex justify-content-center">
                                                <div className="app-screenshot-overlayer">
                                                    <Link className="mfp-image img-fluid" to={shirt1} title=""></Link>
                                                </div>
                                                <div className="screenshot-img">
                                                    <Link to={shirt1} className="lightbox img-fluid">
                                                        <img src={shirt1} alt="" className="img-fluid" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </section>
            <Container fluid>
                <Row>
                    <div className="mobile">
                        <Link to="#about">
                            <span className="phone">
                                <i className="mdi mdi-cellphone"></i>
                            </span>
                        </Link>
                    </div>
                </Row>
            </Container>
            <Features />
            <Contact />
            <Footer />


        </React.Fragment >
    );
}

export default Home;