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
                <section className="tagline d-none d-md-block">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <div className="d-flex">
                                    <div className="phone">
                                        <i className="mdi mdi-phone"></i>  +92 333 56 26 720
                                    </div>
                                    <div className="email ms-3">
                                        <Link to="mailto:#" className="text-dark">
                                            <i className="mdi mdi-email-open-outline"></i> paisapk@gmail.com
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <ul className="top_socials d-flex list-unstyled justify-content-end mb-0">
                                    <li className="entry">
                                        <Link to="#">
                                            <i className="bx bxl-facebook-circle"></i>
                                        </Link>
                                    </li>
                                    <li className="entry">
                                        <Link to="#">
                                            <i className="bx bxl-dribbble"></i>
                                        </Link>
                                    </li>
                                    <li className="entry">
                                        <Link to="#">
                                            <i className="bx bxl-instagram"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <div className="clear"></div>
                    </Container>
                </section>

                <nav className={`navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-light ${navClass}`}
                    id="navbar">
                    <Container fluid>
                        <Navbar.Brand href="index-1.html" className="logo text-uppercase">
                            <img src={logoLight} className="logo-light" alt="" height="30" />
                            <img src={logoDark} className="logo-dark" alt="" height="30" />
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
                                <li className={activeItem === 'About Us' ? 'active' : 'nav-item'} onClick={() => setActiveItem('About Us')}>
                                    <Nav.Link href="#about">About Us</Nav.Link>
                                </li>
                                <li className={activeItem === 'Features' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Features')}>
                                    <Nav.Link href="#features">Features</Nav.Link>
                                </li>
                                <li className={activeItem === 'Pricing' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Pricing')}>
                                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                                </li>
                                <li className={activeItem === 'Application' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Application')}>
                                    <Nav.Link href="#app">Application</Nav.Link>
                                </li>
                                <li className={activeItem === 'Team' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Team')}>
                                    <Nav.Link href="#team">Team</Nav.Link>
                                </li>
                                <li className={activeItem === 'Contact' ? 'active' : 'nav-item'} onClick={() => setActiveItem('Contact')}>
                                    <Nav.Link href="#contact">Contact</Nav.Link>
                                </li>
                            </ul>
                            <div className="ms-auto">
                                <Link to="/signin/customer"
                                 className="btn bg-gradiant">Login</Link>
                            </div>
                        </div>
                    </Container>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default DefaultNavbar;

