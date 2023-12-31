import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNav from '../layout/AdminNav';
const CustomerHeader = () => {
  return (
    <Navbar style={{ backgroundColor: '#f2f2f2' }} expand="lg">
      <Container>
        {/* Logo on the left corner */}
        <Navbar.Brand as={Link} to="/">Paisa PK</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ fontWeight:'', fontSize:'16px'}}>
            <Nav.Link as={Link} to="/profile" style={{color:'black'}}>Profile</Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{color:'black'}}>
              <i className="bi bi-cart"></i> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/categories" style={{color:'black'}}>Home</Nav.Link>
            <Nav.Link as={Link} to="/categories" style={{color:'black'}}>Sellers</Nav.Link>
            <Nav.Link as={Link} to="/home" style={{color:'black'}}>Customers</Nav.Link>
            <Nav.Link as={Link} to="/favourites" style={{color:'black'}}>
              <i className="bi bi-heart"></i> UnapprovedProducts
            </Nav.Link>
            <Nav.Link as={Link} to="/favourites" style={{color:'black'}}>
              <i className="bi bi-heart"></i> Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/favourites"style={{color:'black'}}>
              <i className="bi bi-heart"></i> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomerHeader;
