import React, { useEffect, useState, useRef } from 'react'
import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import Image
import logoLight from "../images/logo.png";
import logoDark from "../images/logo.png";

const DefaultNavbar = () => {

    const navigateToSigin = () => {
        window.location.href = "/signin/customer";
    }

    const [tokenExists, setTokenExists] = useState(false);

    const [userType, setUserType] = useState('');


    //check if token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token == null || token === '') {
            console.log('token does not exist');
            setTokenExists(false);
            return;
        }
        if (token) {
            console.log('token exists');
            setTokenExists(true);
            //get user type from token
            const tokenParts = token.split('.');
            const encodedPayload = tokenParts[1];
            const rawPayload = atob(encodedPayload);
            const user = JSON.parse(rawPayload);
            setUserType(user.type);
            console.log(userType);
        }
    }
        , []);

    const [activeItem, setActiveItem] = useState('Home');

    const [navClass, setnavClass] = useState("");


    // navbar Scroll

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setnavClass("nav-sticky");
        } else {
            setnavClass("");
        }
    }

    // toggle

    const navMenuRef = useRef(null);

    const toggleNavMenu = () => {
        navMenuRef.current.classList.toggle('collapse');
    };


    return (
        <React.Fragment>
            <div data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="61" data-bs-smooth-scroll="true" className="scrollspy-example-2">


                <nav className={`navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-light ${navClass}`}
                    id="navbar">
                    <Container fluid>
                        <Navbar.Brand href="index-1.html" className="logo text-uppercase">
                            <img src={logoLight} className="logo-light" alt="" height="100" />
                            <img src={logoDark} className="logo-dark" alt="" height="100" />
                        </Navbar.Brand>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNavMenu}>
                            <span className="mdi mdi-menu"></span>
                        </button>

                        <div ref={navMenuRef} className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ms-auto" id="navbar-navlist">
                                <li className={activeItem === 'Home' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Home')} >
                                    <Nav.Link href="#home">Home</Nav.Link>
                                </li>
                                <li className={activeItem === 'Features' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Features')}>
                                    <Nav.Link href="#features">Features</Nav.Link>
                                </li>
                                <li className={activeItem === 'Contact' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Contact')}>
                                    <Nav.Link href="#contact">Contact</Nav.Link>
                                </li>
                            </ul>
                            <div className="ms-auto">
                                {tokenExists ? (
                                    userType === 'Customer' ? (
                                        <Link to="/customer" className="btn bg-gradiant" style={{ marginRight: '10px' }}>Dashboard</Link>
                                    ) : userType === 'admin' ? (
                                        <Link to="/admin-dashboard" className="btn bg-gradiant" style={{ marginRight: '10px' }}>Dashboard</Link>
                                    ) : userType === 'Seller' ? (
                                        <Link to="/sellerdashboard" className="btn bg-gradiant" style={{ marginRight: '10px' }}>Dashboard</Link>
                                    ): userType === 'SuperAdmin' ? (
                                        <Link to="/superadmin/" className="btn bg-gradiant" style={{ marginRight: '10px' }}>Dashboard</Link>
                                    )  
                                    : null
                                ) : (
                                    <Link to="/signin/customer" className="btn bg-gradiant" style={{ marginRight: '10px' }}>Login</Link>
                                )}

                                <Link to="/customer/signup" className="btn bg-gradiant">Sign up</Link>
                            </div>



                        </div>
                    </Container>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default DefaultNavbar;

