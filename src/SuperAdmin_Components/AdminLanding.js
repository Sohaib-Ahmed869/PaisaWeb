import React from 'react';
import classNames from 'classnames';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const AdminLanding = () => {
  const handleButtonClickAdmin = () => {
    window.location.href = '/superadmin'; // Replace with the actual path
  };
  const voucher = () => {
    window.location.href = '/superadmin/voucherManagement'; // Replace with the actual path
  };

  const socialMedia = () => {
    window.location.href = '/superadmin/socialMedia'; // Replace with the actual path
  }



  return (
    <section className='home-1 home-2 bg-light'>
      <Container>
        <Row className="align-items-center text-center">
          <h1>Welcome, Super Admin</h1>
          <h2 className="subtitle">What would you like to do?</h2>
          <Col lg={4}>
            <div className="home-content mt-4">
              <h1 className="title">Admin Management</h1>
              <p className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </Col>
          <Col lg={8}>
            <div className="signup-form mt-4">
              <form
                action="#"
                className="signup-form mt-4 mb-5 text-lg-left p-4 p-md-5 shadow rounded bg-white border">
                <Row>
                  <Col lg={6} className="mb-3">
                    <div className="form-group">
                      <Link
                        className={classNames(
                          'btn btn-primary',
                          'btn-block',
                          'btn-lg',
                          'rounded-pill',
                          'mt-5',
                          'mb-4',
                        )}
                        onClick={handleButtonClickAdmin}
                      >
                        Admin Management
                      </Link>
                    </div>
                  </Col>
                  <Col lg={6} className="mb-3">
                    <div className="form-group">
                      <Link
                        className={classNames(
                          'btn btn-primary',
                          'btn-block',
                          'btn-lg',
                          'rounded-pill',
                          'mt-5',
                          'mb-4',
                        )}
                        onClick={voucher}
                      >
                        Voucher Management
                      </Link>
                    </div>
                  </Col>

                
                </Row>

              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>



  );
};

export default AdminLanding;
