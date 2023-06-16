import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import '../../App.css';

const Footer = () => {
    return (
        <footer id="Footer">
            <Container>
                <Row className="py-3">
                    <Col md={6}>
                        {/* <Link to="/admin"><h3 style={{color:'#1D1E4D', fontWeight:'800'}}><i className="now-ui-icons users_circle-08 mr-2"></i>Admin Panel</h3></Link> */}
                        <h4 style={{color:'#1D1E4D', fontWeight:'800'}}>Gifson Laundry Service</h4>
                        <p className="text-white" style={{fontWeight:'400'}}>Email: gifsonmate@gmail.com</p>
                        <p className="text-white" style={{fontWeight:'400'}}>Phone: +2347026879779</p>
                    </Col>
                    <Col md={3} className="py-3">
                    <ul className="list-unstyled">
                            <li className="py-2"><Link to='/faq' style={{fontWeight:'600', fontSize:'1rem'}} >Read FAQ</Link></li>
                            <li className="py-2"><Link to='/about' style={{fontWeight:'600', fontSize:'1rem'}}>About Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} className="py-3">
                    <ul className="list-unstyled">
                            <li className="py-2" ><a href='/terms' style={{fontWeight:'600', fontSize:'1rem'}}>Terms Of Use</a></li>
                            <li className="py-2" ><Link to ='/ContactUs' style={{fontWeight:'600', fontSize:'1rem'}}>Contact Us</Link></li>
                        </ul>
                    </Col>
                </Row>
                <div className='footer-bottom d-flex justify-content-center'>
                    <p className='text-white'>Copyright &copy; 2022 Re-engineered by Yalebstech </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;