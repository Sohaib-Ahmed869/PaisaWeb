// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './ProductDetails.js';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './Home.css';

// Bootstrap
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
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCorusel.js';
import CartPage from './CartPage';  // Import CartPage
import Footer from '../layout/footer.js';

const Home2 = ({ cart, setCart, setIsCartVisible }) => {

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const [products, setProducts] = useState([]);
    const [clickedProducts, setClickedProducts] = useState([]);

    const updateCart = (newCart) => {
        setCart(newCart);
    };

    const fetchProducts = async () => {
        try {

            const URL = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.get(`${URL}/customer/products`);
            setProducts(response.data.products);
            console.log('Products:', response.data);
            // Initialize clickedProducts array with the same length as products, all set to false
            setClickedProducts(Array(response.data.length).fill(false));
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const addToCart = (productId, index) => {
        if (!cart.includes(productId)) {
            setCart((prevCart) => [...prevCart, productId]);
            // Update the clicked state for the specific product
            setClickedProducts((prevClicked) => {
                const newClicked = [...prevClicked];
                newClicked[index] = true;
                return newClicked;
            });
            console.log(`Added product with ID ${productId} to cart`);
        }
    };

    const onDesignClick = () => {
        window.location.href = "/customer/addDesign";
    }

    const onSigninClick = () => {
        window.location.href = "/signin/customer";
    }

    const onSignupClick = () => {
        window.location.href = "/customer/signup";
    }

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <React.Fragment>
            <Navbar className="bg-body-tertiary text-dark" expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="#">Paisa PK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 text-dark"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link>
                                <Link className='Profile' to="/">
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className='Profile' to="/profile">
                                    Profile
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <Link className='CartLink' to="/cart" onClick={() => setIsCartVisible(true)} style={{ marginRight: '1rem' }}>
                            Cart ({cart.length})
                        </Link>

                        <Form className="d-flex">
                            <Button variant="outline-success"
                                className='mr-2 btn btn-primary'
                                style={{ marginRight: '1rem' }}
                                onClick={onDesignClick}
                            >Design</Button>
                            <Button variant="outline-success"
                                className='mr-2 btn btn-primary'
                                style={{ marginRight: '1rem' }}
                                onClick={logout}
                            >Logout</Button>
                            <Button variant="outline-success"
                                className='mr-2 btn btn-primary'
                                style={{ marginRight: '1rem' }}
                                onClick={onSignupClick}
                            >Sign Up</Button>
                            <Button variant="outline-success"
                                className='mr-2 btn btn-primary'
                                onClick={onSigninClick}
                            >Sign In</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section className='home-1' style={{ marginTop: '-5rem' }}>

                <Carousel>
                    <Carousel.Item>
                        <ExampleCarouselImage text="First slide" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Second slide" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Third slide" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Row className="justify-content-center">
                    <Col lg={12}>
                        <div className="sec-hd">
                            <span className="heading"></span>
                            <h2 className="sec-title mt-4">Adverisement Management</h2>
                            <span className="heading"></span>
                        </div>
                    </Col>
                </Row>
                <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {products.map((product, index) => (
                        <div key={product._id} className="product-card shadow-sm p-3 mb-5 bg-body rounded hover-shadow-lg border border-3 text-center text-dark"
                            style={{ width: '18rem', margin: '1rem' }}>
                            <img src={`data:${product.img.contentType};base64,${product.img.data}`} alt={product.name} style={{ width: '10rem', height: '10rem' }} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <button className="btn btn-primary"
                                onClick={() => addToCart(product._id, index)}
                                disabled={clickedProducts[index]}
                            >
                                {clickedProducts[index] ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
                <Router>
                    <Switch
                        path="/cart"
                        component={<CartPage cart={cart} updateCart={updateCart} />}
                    />
                </Router>
                <Footer />
            </section>
        </React.Fragment>
    );
};

export default Home2;