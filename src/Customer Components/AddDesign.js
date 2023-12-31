import React from 'react';
import { Link } from 'react-router-dom';
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
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from '../layout/footer';
const URL = process.env.REACT_APP_BACKEND_URL;

const Design =() => {
    const [customername, setCustomername] = useState('');
    const [designs, setDesigns] = useState([]);
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

    const getAllDesigns = async () => {
        try {
            const response = await fetch(`${URL}/customer/getdesigns`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            });

            const responseData = await response.json();

            console.log(responseData);

            setDesigns(responseData.designs);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllDesigns();
    }, []);

    const deleteDesign = async (name) => {
        try {
            const response = await fetch(`${URL}/customer/deleteDesign/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            });

            const responseData = await response.json();

            console.log(responseData);

            getAllDesigns();
        } catch (err) {
            console.log(err);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log('Name', customername);
        const image = document.getElementById('image').files[0];
        const base64 = await convertBase64(image);

        try {
            const designResponse = await fetch(`${URL}/customer/adddesign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: customername,
                    image: base64
                })
            });

            const designData = await designResponse.json();
            console.log(designData);

            if (designData) {
                alert('Design added successfully');
                setCustomername('');
                getAllDesigns();
            }
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Designs</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="name">Customer Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter customer name" value={customername} onChange={(e) => setCustomername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Design Image</label>
                                <input type="file" className="form-control" id="image" />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Design</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">All Designs</h2>
                    </div>
                </div>
                <div className="row">
                    {
                        designs.map((design) => {
                            return (
                                <div className="col-12 col-md-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{design.customer_name}</Card.Title>
                                            <Card.Text>
                                                <img src={`data:${design.image.contentType};base64,${design.image}`} alt="Design" className="img-fluid" />
                                            </Card.Text>
                                            <Button variant="top" onClick={() => deleteDesign(design.customer_name)}>Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )

}




export default Design;