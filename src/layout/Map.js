import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';


const Contact = () => {

  return (
    <React.Fragment>
      <section className="contact overflow-hidden" id="contact">
        <Container >
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="sec-hd">
                <span className="heading"></span>
                <h2 className="sec-title">Find Us!</h2>
                <span className="heading"></span>
              </div>
            </Col>
          </Row>
          

          <Row className="my-5 py-4 justify-content-center text-center">
            <Col md={4}>
              <div>
                <i className="mdi mdi-google-maps f-50 text-primary"></i>
                <h5 className="mb-1">Location</h5>
                <p className="f-14 mb-0 text-muted">FAST NUCES, Islamabad, Pakistan</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-4 mt-lg-0">
                <i className="mdi mdi-email f-50 text-primary"></i>
                <h5 className="mb-1">Email</h5>
                <p className="f-14 mb-0 text-muted">paisa.pk@gmail.com</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="mt-4 mt-lg-0">
                <i className="mdi mdi-phone f-50 text-primary"></i>
                <h5 className="mb-1">Phone</h5>
                <p className="f-14 mb-0 text-muted">+92 333 5626720</p>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="position-relative">
          <div className="contact-map">
            <iframe className="map"
              src="https://maps.google.com/maps?q=FAST%20NUCES&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              width="100%" height="450" title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Contact;