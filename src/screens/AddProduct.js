import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import { useState, useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL;
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


const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const response = await fetch(`${URL}/admin/getCategories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const responseData = await response.json();
            console.log(responseData);
            setCategories(responseData.categories);
            setCategory(responseData.categories[0].name);

        }
        catch (err) {
            console.log(err);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log('Type', category);
        console.log(name, price, description, category, quantity);

        try {
            const response = await fetch(`${URL}/seller/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name, price, description, category, quantity
                })
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData) {
                alert('Product Added Successfully');
                console.log('File selected');

                // Now, let's handle the image upload
                const fileInput = document.getElementById('imageInput');

                const file = fileInput.files[0];

                if (file) {
                    console.log('File selected');
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);

                    const nameofProduct = name;

                    formData.append('name', nameofProduct);

                    if (!file) {
                        console.log('No file selected');
                        return;
                    }

                    try {
                        const imageResponse = await fetch(`${URL}/seller/addImageToProduct`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `${localStorage.getItem('token')}`
                            },
                            body: formData
                        });

                        const imageResponseData = await imageResponse.json();
                        console.log(imageResponseData);
                        console.log(imageResponseData.success);


                        //add image to frontend public folder
                        

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
    }

        , [])




    return (
        <React.Fragment>
            <section id="home" style={{ textAlign: 'left', paddingTop: '100px' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={4}>
                            <div className="home-content mt-4">
                                <h1 className="title">Add Product</h1>
                                <p className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
                                            <label className="form-label">Product Price</label>
                                            <input type="text" className="form-control" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Product Description</label>
                                            <input type="text" className="form-control" placeholder="Enter Product Description" onChange={(e) => setDescription(e.target.value)} />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Product Image</label>
                                            <input type="file" className="form-control" placeholder="Enter Product Image" id="imageInput" />
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Product Category</label>
                                            <select className="form-control" id="type">
                                                {
                                                    categories.map((category) => {
                                                        return (
                                                            <option value={category.name} key={category._id}
                                                                onChange={(e) => setCategory(e.target.value)}
                                                            >{category.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </Col>
                                        <Col lg={6} className="mb-3">
                                            <label className="form-label">Product Quantity</label>
                                            <input type="text" className="form-control" placeholder="Enter Product Quantity" onChange={(e) => setQuantity(e.target.value)} />
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
}

export default AddProduct
