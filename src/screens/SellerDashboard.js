import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Pagination
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import SellerNavbar from '../layout/SellerNav';
const URL = process.env.REACT_APP_BACKEND_URL;

const SellerDashboard = () => {

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productPage, setProductPage] = useState(1);
    const [orderPage, setOrderPage] = useState(1);
    const productsPerPage = 5;
    const ordersPerPage = 5;
    const getProducts = async () => {
        try {
            const response = await fetch(`${URL}/seller/getAllProducts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });

            const responseData = await response.json();
            console.log(responseData);
            setProducts(responseData.products);

        }
        catch (err) {
            console.log(err);
        }
    }

    const deActivateProduct = async (name) => {
        try {
            const response = await fetch(`${URL}/seller/deactivateProduct`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: name
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            getProducts();

        }
        catch (err) {
            console.log(err);
        }
    }

    const activateProduct = async (name) => {
        try {
            const response = await fetch(`${URL}/seller/activateProduct`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: name
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            getProducts();

        }
        catch (err) {
            console.log(err);
        }
    }

    const getOrders = async () => {
        try {
            const response = await fetch(`${URL}/seller/viewAllOrders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });

            const responseData = await response.json();
            console.log(responseData);
            setOrders(responseData.orders);

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts();
        getOrders();
    }
        , []);

    const handleProductPageChange = (page) => {
        setProductPage(page);
    };



        return (
            <React.Fragment>
                <SellerNavbar />
                <section id="home" style={{ textAlign: 'left', paddingTop: '100px' }}>
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={12}>
                                <div className="home-content mt-4">
                                    <h1 className="title">Seller Dashboard</h1>
                                    <p className="subtitle">Welcome to your Store</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="signup-form mt-4">
                                    <Link to="/addProduct2" className="btn btn-primary">Add Product</Link>
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Discount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                products &&
                                                products.map((product, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {product.images.map((image, imgIndex) => (
                                                                <img
                                                                    key={imgIndex}
                                                                    src={`data:${image.contentType};base64,${image.data}`}
                                                                    alt={`Product ${index + 1} Image ${imgIndex + 1}`}
                                                                    style={{ maxWidth: '50px', maxHeight: '50px', margin: '5px' }}
                                                                />
                                                            ))}
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.discount}</td>
                                                        <td>{product.active ? "Active" : "Deactive"}</td>
                                                        {
                                                            /*
                                                            send product as props to editProduct
                                                            */
                                                        }
                                                        <td><Link to={{ pathname: "/editProduct", state: { product: product } }} className="btn btn-primary">Edit</Link></td>
                                                        <td>{product.active ? <button className="btn btn-danger" onClick={() => deActivateProduct(product.name)}>Deactivate</button> : <button className="btn btn-success" onClick={() => activateProduct(product.name)}>Activate</button>}</td>
                                                    </tr>

                                                ))}




                                        </tbody>
                                    </table>

                                </div>
                            </Col>
                        </Row>

                    </Container>
                </section>
            </React.Fragment>
        );
    }

    export default SellerDashboard;