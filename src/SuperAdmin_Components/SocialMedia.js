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
import { get } from 'lodash';

const url = process.env.REACT_APP_BACKEND_URL;

const SocialMedia = () => {
    const [site, setSite] = useState('');
    const [link, setLink] = useState('');

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


    const submitHandler = async (e) => {

        e.preventDefault();

        const image = document.getElementById('imageInput').files[0];
        const base64 = await convertBase64(image);
        console.log(site, base64);


        try {
            const response = await fetch(`${url}/superadmin/addSocialMedia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    site: site,
                    link: link,
                    image: base64
                })
            });

            const responseData = await response.json();

            console.log(responseData);

            if (responseData) {
                alert('Social Media Added Successfully');
                window.location.reload();
            } else {
                alert(responseData.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const [socialMedia, setSocialMedia] = useState([]);

    const getSocialMedia = async () => {
        try {
            const response = await fetch(`${url}/superadmin/viewAllSocialMedia`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });


            const responseData = await response.json();
            console.log(responseData);
            setSocialMedia(responseData.socialMedia);


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSocialMedia();
    }
        , []);

    const deleteSocialMedia = async (site) => {
        console.log('success');
        try {
            const response = await fetch(`${url}/superadmin/deleteSocialMedia`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    site: site
                })
            });
            
            const responseData = await response.json();
            console.log(responseData);
            getSocialMedia();

        } catch (err) {
            console.log(err);
            console.log('error');
        }
    }



    return (
        <React.Fragment>
            console.log(socialMedia);
            <section className='home-1 home-2 bg-light'>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <div className="sec-hd">
                                <span className="heading"></span>
                                <h2 className="sec-title mt-4">Add Social Media</h2>
                                <span className="heading"></span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <div className="contact-box p-4 mt-4 rounded shadow">
                                <form
                                    onSubmit={submitHandler}
                                    action="#"
                                    className="row"
                                    data-aos="fade-up"
                                    data-aos-duration="1200"
                                >
                                    <Col lg={6}>
                                        <div className="form-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Site"
                                                onChange={(e) => setSite(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Link"
                                                onChange={(e) => setLink(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="form-group mt-3">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="imageInput"
                                                name="imageInput"
                                                placeholder="Image"
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="form-group mt-3">
                                            <button
                                                type="submit"
                                                id="submit"
                                                name="send"
                                                className="btn btn-primary"
                                            >
                                                Add Social Media
                                            </button>
                                        </div>
                                    </Col>
                                </form>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <div className="sec-hd">
                                <span className="heading"></span>
                                <h2 className="sec-title mt-4">Social Media</h2>
                                <span className="heading"></span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-5">
                        {socialMedia.map((social) => (
                            console.log(social),
                            <Col lg={4} md={6} sm={12} className="mt-4 pt-2">
                                <Card className="border-0 work-container work-grid position-relative d-block overflow-hidden rounded">
                                    <CardBody style={{ width: '18rem', height: '20rem' }}>
                                        <Card.Img variant="top" src={`data:${social.icon.contentType};base64,${social.icon.data}`} style={{ width: '16rem', height: '10rem' }} />
                                            <CardTitle className="mb-0">
                                                <Link
                                                    to="#"
                                                    className="text-dark title h5 d-block mb-0"
                                                >
                                                    {social.site}
                                                </Link>
                                            </CardTitle>
                                            <CardSubtitle className="text-muted tag mb-0">
                                                {social.link}
                                            </CardSubtitle>
                                            <Button variant="primary" onClick={() => deleteSocialMedia(social.site)}>Delete</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer />
        </React.Fragment>
    );
}

export default SocialMedia;

