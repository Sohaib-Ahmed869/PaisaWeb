import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames';

import adminImage from "../assets/images/features.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1800,
});

const AdminLanding = () => {
  const handleButtonClickAddAdmin = () => {
    window.location.href = '/superadmin/addAdmin'; // Replace with the actual path
  };

  const voucher = () => {
    window.location.href = '/superadmin/VoucherManagement'; // Replace with the actual path
  };

  const blockUnblock = () => {
    window.location.href = '/superadmin/blockUnblock'; // Replace with the actual path
  }

  const advertisement = () => {
    window.location.href = '/superadmin/addAdvertisement'; // Replace with the actual path
  }

  const socialMedia = () => {
    window.location.href = '/superadmin/socialMedia'; // Replace with the actual path
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  }




  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="sec-hd">
            <span className="heading"></span>
            <h2 className="sec-title mt-4">Super Admin Dashboard</h2>
            <span className="heading"></span>
          </div>
        </Col>
      </Row>
      <section className="section features" id="admin-landing">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={4} md={10} data-aos="fade-right">
              <div className="features-box text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-user-plus"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Add Admin</h5>
                  <Button
                    className={classNames('button', 'mt-3')}
                    onClick={handleButtonClickAddAdmin}
                  >
                    Add Admin
                  </Button>
                </div>
              </div>
              <div className="features-box mt-5 text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-ticket"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Admin Block/Ublock</h5>
                  <Button
                    className={classNames('button', 'mt-3')}
                    onClick={blockUnblock}
                  >
                    Admin Block/Ublock
                  </Button>
                </div>
              </div>
              <div className="features-box mt-5 text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-ticket"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Voucher Management</h5>
                  <Button
                    className={classNames('button', 'mt-3')}
                    onClick={voucher}
                  >
                    Voucher Management
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="text-center">
                <img
                  src={adminImage}
                  className="img-fluid"
                  data-aos="zoom-in"
                  alt="Admin"
                />
              </div>
            </Col>
            <Col lg={4} md={10} data-aos="fade-left">
              <div className="features-box">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-phone"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">
                    Advertisement Management
                  </h5>
                  <Button
                    className={classNames('button', 'mt-3')}
                    onClick={() => { advertisement() }}
                  >
                    Advertisement Management
                  </Button>
                </div>
              </div>
              <div className="features-box mt-5">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-share-alt"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">
                    Social Media Management
                  </h5>
                  <Button
                    className={classNames('button', 'mt-3')}
                    onClick={() => { socialMedia() }}
                  >
                    Social Media Management
                  </Button>
                </div>
              </div>
              <div className="features-box mt-5">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-share-alt"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">
                    Logout
                  </h5>
                  <Button
                    className={classNames('button', 'mt-3')}
                    onClick={() => { logout() }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AdminLanding;
