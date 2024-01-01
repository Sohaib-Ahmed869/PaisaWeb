import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav
} from 'react-bootstrap';

// import Image
import logoLight from "../images/logo.png";
import logoDark from "../images/logo.png";
import { Link } from 'react-router-dom';


const Footer = () => {

    // light-dark mode button 
    useEffect(() => {
        const handleClick = () => {
            let theme = localStorage.getItem("theme");
            if (theme === "light" || theme === "") {
                document.body.setAttribute("data-layout-mode", "dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.removeAttribute("data-layout-mode");
                localStorage.setItem("theme", "light");
            }
        };

        const btn = document.getElementById("mode");
        btn.addEventListener("click", handleClick);

        return () => {
            btn.removeEventListener("click", handleClick);
        };
    }, []);

    // Color Switcher

    const setColor = (theme) => {
        console.log(theme);
        const colorOpt = document.getElementById('color-opt');
        colorOpt.href = `/css/colors/${theme}.css`;
    };

    // Switcher

    const [leftPosition, setLeftPosition] = useState('-189px');

    const toggleSwitcher = () => {
        if (leftPosition === '-189px') {
            setLeftPosition('-0px');
        } else {
            setLeftPosition('-189px');
        }
    };




    return (
        <React.Fragment>
            <section className="footer overflow-hidden">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} className="text-center">
                            <Navbar.Brand className="logo text-uppercase" href="index-1.html">
                                <img src={logoLight} className="logo-light" alt="" height="30" />
                                <img src={logoDark} className="logo-dark" alt="" height="30" />
                            </Navbar.Brand>

                            <div className="footer-icon mt-4 d-flex justify-content-center">
                                <div className="d-flex align-items-center">
                                    <Link to="#" className="me-2 avatar-sm text-center"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Facebook">
                                        <i className="mdi mdi-facebook f-24 align-middle text-primary"></i>
                                    </Link>
                                    <Link to="#" className="mx-2 avatar-sm text-center"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="twitter">
                                        <i className="mdi mdi-twitter f-24 align-middle text-primary"></i>
                                    </Link>
                                    <Link to="#" className="mx-2 avatar-sm text-center"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="googleplay">
                                        <i className="mdi mdi-google-play f-24 align-middle text-primary"></i>
                                    </Link>
                                    <Link to="#" className="mx-2 avatar-sm text-center">
                                        <i className="mdi mdi-linkedin f-24 align-middle text-primary"
                                            data-bs-toggle="tooltip" data-bs-placement="top" title="linkedin"></i>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <div className="col-lg-8">
                            <Nav className="list-inline d-sm-flex justify-content-between footer-link mb-0">
                                <Nav.Item className="list-inline-item">
                                    <Nav.Link href="#home">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="list-inline-item">
                                    <Nav.Link href="#features">Features</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="list-inline-item">
                                    <Nav.Link href="#contact">Contact</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </Row>
                </Container>
            </section>

            <hr />

            <section className="bottom-footer py-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <p className="mb-0 text-center text-muted">
                                © {new Date().getFullYear()} Paisa.PK
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* light-dark mode button */}
            <button to="3" id="mode" className="mode-btn text-white rounded-end">
                <i className="uil uil-brightness mode-dark mx-auto"></i>
                <i className="uil uil-moon bx-spin mode-light"></i>
            </button>

            {/* color changer */}
            <div className="style-switcher" id="style-switcher" style={{ left: leftPosition }}>
                <div>
                    <h6>Select your color</h6>
                    <ul className="pattern list-unstyled mb-0">
                        <li>
                            <Link className="color1" to="#" onClick={() => { setColor('default'); }}></Link>
                        </li>
                        <li>
                            <Link className="color2" to="#" onClick={() => { setColor('blue'); }}></Link>
                        </li>
                        <li>
                            <Link className="color3" to="#" onClick={() => { setColor('warning'); }}></Link>
                        </li>
                        <li>
                            <Link className="color4" to="#" onClick={() => { setColor('orange'); }}></Link>
                        </li>
                        <li>
                            <Link className="color5" to="#" onClick={() => { setColor('purple'); }}></Link>
                        </li>
                        <li>
                            <Link className="color6" to="#" onClick={() => { setColor('info'); }}></Link>
                        </li>
                    </ul>
                </div>
                <div className="bottom">
                    <Link to="#" className="settings rounded-end" onClick={toggleSwitcher}><i className="uil uil-setting text-white"
                        style={{ display: "inline", lineHeight: "46px" }}></i></Link>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Footer;