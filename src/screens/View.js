import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
} from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from '../layout/footer';
import SellerNavbar from '../layout/SellerNav';
const URL = process.env.REACT_APP_BACKEND_URL;

const SellerDesign =() => {
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

   


    return (
        <div>
            <SellerNavbar />
            <div className="container" style={{ marginTop: '100px' }}>
                
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




export default SellerDesign;