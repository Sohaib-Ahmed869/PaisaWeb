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

const url = process.env.REACT_APP_BACKEND_URL;

const VoucherAdmin = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [vouchers, setVouchers] = useState([]);

  const getAllVouchers = async () => {
    try {
      const response = await fetch(`${url}/superadmin/viewAllVouchers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
      });

      const responseData = await response.json();

      console.log(responseData);

      setVouchers(responseData.vouchers);
    } catch (err) {
      console.log(err);
    }

  }

  const submitHandler = async () => {
    try {
      const response = await fetch(`${url}/superadmin/addVoucher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          voucher_code: name,
          discount: discount,
          expiry_date: expiryDate
        })
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData) {
        alert('Voucher Added Successfully');
        window.location.reload();
      } 
    }
    catch (err) {
      console.log(err);
    }
  }

  const deleteVoucher = async (voucher_code) => {
    try {

      const response = await fetch(`${url}/superadmin/deleteVoucher`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          voucher_code
        })
      });

      const responseData = await response.json();

      console.log(responseData);

      getAllVouchers();

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllVouchers();
  }
    , []);  




  return (
    <React.Fragment>
      <section className="bg-home home-1 bg-circle-gradiant d-flex align-items-center">
        <Container>
          <Row>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="sec-hd">
                  <span className="heading"></span>
                  <h2 className="sec-title mt-4">Voucher Management</h2>
                  <span className="heading"></span>
                </div>
              </Col>
            </Row>
            <label className='form-label'>Voucher Code</label>
            <input className='form-control' type='text' placeholder='Enter Voucer Code' onChange={(e) => setName(e.target.value)} />
            <label className='form-label'>Voucher Discount</label>
            <input className='form-control' type='text' placeholder='Enter Voucer Discount' onChange={(e) => setDiscount(e.target.value)} />
            <label className='form-label'>Voucher Expiry Date</label>
            <input className='form-control' type='date' placeholder='Enter Voucer Expiry Date' onChange={(e) => setExpiryDate(e.target.value)} />
            <Col lg={12} className="mt-3">
              <button type="submit" className="btn btn-primary" onClick={submitHandler}>Add Voucher</button>
            </Col>
          </Row>
          <Row className='mt-5'>
            {vouchers.map((voucher) => (
              <Col lg={4} className="mb-3">
                <Card style={{ width: '18rem', height: '15rem' }}>
                  <Card.Body>
                    <p>{voucher.voucher_code}</p>
                    <Card.Text>
                      {voucher._id}
                    </Card.Text>
                    <Card.Text>
                      Discount: ${voucher.discount}
                    </Card.Text>
                    <Button variant="primary" onClick={() => deleteVoucher(voucher.voucher_code)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default VoucherAdmin;
