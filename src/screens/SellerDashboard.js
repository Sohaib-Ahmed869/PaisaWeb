import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;

const SellerDashboard = () => {

    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const response = await fetch(`${URL}/seller/viewAllProductsForSeller`, {
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





    React.useEffect(() => {
        getProducts();
    }
        , []);

    return (
        <React.Fragment>
            <section id="home" style={{ textAlign: 'left', paddingTop: '100px' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={4}>
                            <div className="home-content mt-4">
                                <h1 className="title">Seller Dashboard</h1>
                                <p className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="signup-form mt-4">
                                <Link to="/addProduct" className="btn btn-primary">Add Product</Link>
                                <table className="table mt-4">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr>
                                                 <td><img src={product.images[0]} alt="product" style={{ width: '100px', height: '100px' }} /></td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.category}</td>
                                                <td>{product.qty}</td>
                                                <td>{product.description}</td>
                                                <td>{product.discount}</td>
                                                <td>{product.active?"Active":"Deactive"}</td>
                                                {
                                                    /*
                                                    send product as props to editProduct
                                                    */
                                                }
                                                <td><Link to={{ pathname: "/editProduct", state: { product: product } }} className="btn btn-primary">Edit</Link></td>
                                                <td>{product.active?<button className="btn btn-danger" onClick={() => deActivateProduct(product.name)}>Deactivate</button>:<button className="btn btn-success" onClick={() => activateProduct(product.name)}>Activate</button>}</td>
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