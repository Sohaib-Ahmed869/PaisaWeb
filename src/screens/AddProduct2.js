import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import SellerNav from '../layout/SellerNav';
const URL = process.env.REACT_APP_BACKEND_URL;

const AddProduct2 = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categories, setCategories] = useState([]);

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

    const getCategories = async () => {
        try {
            const response = await fetch(`${URL}/admin/all-categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            const responseData = await response.json();
            console.log(responseData);
            setCategories(responseData);

        } catch (err) {
            console.log(err);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log('Type', category);
        console.log(name, price, description, category, quantity);

        try {
            const productResponse = await fetch(`${URL}/seller/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name, price, description, category, quantity
                })
            });

            const productData = await productResponse.json();
            console.log(productData);

            

            if (productData) {
                alert('Product Added Successfully');
                console.log('File selected');

                // Now, let's handle the image upload as base64
                const fileInput = document.getElementById('imageInput');
                const file = fileInput.files[0];

                if (file) {
                    console.log('File selected');
                    const base64Image = await convertBase64(file);

                    try {
                        const imageResponse = await fetch(`${URL}/seller/addImgToProduct`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                name,
                                image: base64Image, // Include the base64 encoded image data
                            })
                        });

                        const imageResponseData = await imageResponse.json();
                        console.log(imageResponseData);
                        console.log(imageResponseData.message);

                        // Add logic to handle the response as needed
                    } catch (imageError) {
                        console.log(imageError);
                        console.log('Error in uploading image');
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <React.Fragment>
            <SellerNav />
            <section id="home" style={{ textAlign: 'left', paddingTop: '100px' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={4}>
                            <div className="home-content mt-4">
                                <h1 className="title">Add Product</h1>
                                <p className="subtitle">Add a new product to your store.</p>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="signup-form mt-4">
                                <form className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                                    <Row>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Product Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Price</label>
                                            <input type="text" className="form-control" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input type="text" className="form-control" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Category</label>
                                            <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                                                {categories.map((category) => (
                                                    <option value={category.name}>{category.name}</option>
                                                ))}
                                            </select>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Quantity</label>
                                            <input type="text" className="form-control" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input type="file" className="form-control" placeholder="Enter Image" id="imageInput" />
                                        </Col>
                                        
                                        <Col lg={12} className="mb-3">
                                            <button type="submit" className="btn btn-primary" onClick={submitHandler}>Add Product</button>
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
};

export default AddProduct2;
