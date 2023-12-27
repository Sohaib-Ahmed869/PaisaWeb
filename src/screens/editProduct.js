import React from "react";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';


const URL = process.env.REACT_APP_BACKEND_URL;

const EditProduct = () => {
    const location = useLocation();
    const product = location.state.product;

    console.log(product);

    const [quantity, setQuantity] = useState(product.quantity);
    const [discount, setDiscount] = useState(product.discount);


    const updateQuantity = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/seller/updateQuantity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: product.name,
                    quantity: quantity
                })
            });

            const responseData = await response.json();
            console.log(responseData);

            alert('Quantity Updated Successfully');

        }
        catch (err) {
            console.log(err);
        }
    }

    const updateDiscount = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/seller/updateDiscount`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: product.name,
                    discount: discount
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            //alert(responseData.message);

            alert('Discount Updated Successfully');

        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        //add more to quantity
        <React.Fragment>
            <section id="home" style={{ textAlign: 'left', paddingTop: '100px' }}>
                <Container>
                    <Row className="product-detail">
                        <Col lg={6}>
                            <div className="product-detail-img">
                                <img
                                    src={`data:${product.images[0].contentType};base64,${product.images[0].data}`}
                                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '5px' }}
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="product-detail-content">
                                <h1 className="title">{product.name}</h1>
                                <p className="subtitle">{product.description}</p>
                                <p className="price">Price: {product.price}</p>
                                <p className="price">Quantity: {product.quantity}</p>
                                <p className="price">Discount: {product.discount}</p>
                                <p className="price">Category: {product.category}</p>
                                <p className="price">Status: {product.active ? 'Active' : 'Inactive'}</p>
                                <p className="price">Approved: {product.approval ? 'Approved' : 'Not Approved'}</p>
                            </div>
                        </Col>

                    </Row>
                    <Row>

                        <Col lg={6}>
                            <div className="signup-form mt-4">
                                <h1 className="title">Inventory</h1>
                                <form action="#" className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                                    <Row>
                                        <Col lg={6} className="mb-3">
                                            <label htmlFor="quantity">Quantity</label>
                                            {/*
                                            give option for + or - quantity
                                            */}
                                            <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={updateQuantity}
                                    >Update Quantity</button>
                                </form>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="signup-form mt-4">
                                <h1 className="title">Discount</h1>
                                <form action="#" className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                                    <Row>
                                        <Col lg={6} className="mb-3">
                                            <label htmlFor="discount">Discount</label>
                                            <input type="number" className="form-control" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                        </Col>
                                    </Row>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={updateDiscount}
                                    >Update Discount</button>
                                </form>
                            </div>
                        </Col>

                    </Row>

                </Container>
            </section>
        </React.Fragment>
    )
}

export default EditProduct;