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
const Advertisement = () => {
    const [name, setName] = useState('');
    const [advertisements, setAdvertisements] = useState([]);
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

    const getAllAdvertisements = async () => {
        try {
            const response = await fetch(`${URL}/superadmin/viewAllAdvertisements`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            });

            const responseData = await response.json();

            console.log(responseData);

            setAdvertisements(responseData.advertisements);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllAdvertisements();
    }, []);

    const deleteAdvertisement = async (name) => {
        try {
            const response = await fetch(`${URL}/superadmin/deleteAdvertisement`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name
                })
            });

            const responseData = await response.json();

            console.log(responseData);

            getAllAdvertisements();

        } catch (err) {
            console.log(err);
        }
    }



    const submitHandler = async (e) => {
        e.preventDefault();

        const image = document.getElementById('imageInput').files[0];
        const base64 = await convertBase64(image);

        console.log(name, base64);

        try {
            const response = await fetch(`${URL}/superadmin/addAdvertisement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name,
                    image: base64
                })
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData) {
                alert('Advertisement Added Successfully');
                window.location.reload();
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <section className='bg-home home-1 bg-circle-gradiant d-flex align-items-center'>
                <Container>
                    <Row>
                        <Row className="justify-content-center">
                            <Col lg={12}>
                                <div className="sec-hd">
                                    <span className="heading"></span>
                                    <h2 className="sec-title mt-4">Adverisement Management</h2>
                                    <span className="heading"></span>
                                </div>
                            </Col>
                        </Row>
                        <label className='form-label'>Advertisement Name</label>
                        <input className='form-control' type='text' placeholder='Enter Advertisement Name' onChange={(e) => setName(e.target.value)} />
                        <label className='form-label'>Advertisement Photo</label>
                        <input className='form-control' type='file' placeholder='Enter Advertisement Photo' id='imageInput' />
                        <Col lg={12} className="mt-3">
                            <button type="submit" className="btn btn-primary" onClick={submitHandler}>Add Adverisement</button>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        {advertisements.map((advertisement) => (
                            console.log(advertisement),
                            <Col lg={4} className="mb-3">
                                
                                <Card style={{ width: '18rem', height: '20rem' }}>
                                    <Card.Img variant="top" src={`data:${advertisement.contentType};base64,${advertisement.image.data}`} style={{ width: '18rem', height: '10rem' }} />
                                    <Card.Body>
                                        <p>{advertisement.name}</p>
                                        <Card.Text>
                                            {advertisement._id}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => deleteAdvertisement(advertisement.name)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default Advertisement;
