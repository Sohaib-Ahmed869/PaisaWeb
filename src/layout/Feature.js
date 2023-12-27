import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import images
import features from "../assets/images/features.png";


AOS.init({
  duration: 1800,
});



const Features = () => {
  return (
    <React.Fragment>
      <section className="section features" id="features">
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="sec-hd">
                <span className="heading"></span>
                <h2 className="sec-title">Features for our app</h2>
                <span className="heading"></span>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col lg={4} md={10} data-aos="fade-right" >
              <div className="features-box text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-users-alt"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Purchase the best clothes</h5>
                  <p className="text-muted mt-3">Paisa PK is a platform where you can buy the best clothes in the market.</p>
                </div>
              </div>

              <div className="features-box mt-5 text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-envelope-minus"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Smooth and easy to use</h5>
                  <p className="text-muted mt-3">The website is very easy to use and is very smooth.</p>
                </div>
              </div>

              <div className="features-box mt-5 text-end">
                <div className="features-icon float-end ms-2">
                  <i className="uil uil-mobile-android-alt"></i>
                </div>
                <div className="pe-3 me-5">
                  <h5 className="f-15 text-uppercase">Fast Transactions</h5>
                  <p className="text-muted mt-3">The transactions are very fast and secure.</p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="text-center">

                <img src={features} className="img-fluid" data-aos="zoom-in" alt="" />
              </div>
            </Col>
            <Col lg={4} md={10} data-aos="fade-left">
              <div className="features-box">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-calender"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">Chat with Administration</h5>
                  <p className="text-muted mt-3">Chat with the administration to get your queries solved.</p>
                </div>
              </div>
              <div className="features-box mt-5">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-bolt"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">Variety of Sellers</h5>
                  <p className="text-muted mt-3">
                    There are a variety of sellers on the website, you can choose from them.
                  </p>
                </div>
              </div>
              <div className="features-box mt-5">
                <div className="features-icon float-start me-2">
                  <i className="uil uil-feedback"></i>
                </div>
                <div className="ps-3 ms-5">
                  <h5 className="f-15 text-uppercase">Analytics</h5>
                  <p className="text-muted mt-3">
                    Get analytics of your sales and purchases.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Features;