import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import SellerNavbar from '../layout/SellerNav';

const URL = process.env.REACT_APP_BACKEND_URL;

const UpdateProfile = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');



    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(password, email);
        try {

            const response = await fetch(`${URL}/seller/updateProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    password, email, name
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            //save token in local storage
            localStorage.setItem('token', responseData.token);

            //if not ok then alert
            if (!response.ok) {
                alert(responseData.error);
            }

            if (response.ok) {
                alert('Profile Updated');
                //logout and redirect to home
                localStorage.removeItem('token');
                window.location.href = "/";
            }

        }
        catch (err) {
            console.log(err, 'error');
        }
    }

    return (
        <React.Fragment>

            <section className=' home-1 bg-home bg-circle-gradiant d-flex align-items-center' id="home">
                <SellerNavbar />
                <Container>
                    <section className='home-2'>
                        <Row>
                            <Col lg={12} md={6} sm={12} className='mt-5'>
                                <div className='home-content mt-5'>
                                    <h1 className='text-black'>Update Profile</h1>
                                    <p className='text-black'>Update your profile details</p>
                                </div>
                            </Col>
                            <Col lg={12} md={6} sm={12} className='mt-5'>
                                <div className='home-content mt-5'>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Name</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default UpdateProfile;