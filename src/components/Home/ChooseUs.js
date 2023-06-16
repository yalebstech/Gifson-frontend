import { faLeaf, faMedal, faMoneyBillAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import '../../App.css';

const service = [
	{
		src: <FontAwesomeIcon icon={faTruck} /> ,
		name: 'Pickup & Delivery ',
		title: 'Doorstep Pickup and Your clothes will be delivered at your doorstep on time and as fresh as daisy.'
	},
	{
		src: <FontAwesomeIcon icon={faMoneyBillAlt} /> ,
		name: 'Affordable',
		title: 'No Additional Cost! You pay just as same as the price set by your selected laundry vendor.'
	},
	{
		src: <FontAwesomeIcon icon={faLeaf} /> ,
		name: 'Eco Friendly',
		title: 'Local residents love on our reliable laundry & dry cleaning services for the fast, accurate, top quality results.'
	},
	{
		src: <FontAwesomeIcon icon={faMedal} /> ,
		name: 'Quality Guarantee',
		title: 'We are professionals in the laundry business, which means we always up to date on the latest technologies.'
	}
];

const ChooseUs = () => {
    return (
        <section className="mb-3" id="ChooseUs">
        <Container>
            <div className="d-flex justify-content-center mt-5">
                <h2 className="color-reuse head-title">Why Choose Us</h2>
            </div>
            <Row>
                {service.map(item => 
                    <Col md={6} className="d-flex justify-content-center mt-4" key={item.name}>
                        <Card style={{ width: '20rem' }}>
                            <CardHeader className="text-center mt-2 color-reuse">
							<span className="icon-size">
                               {item.src}
                             </span>
							</CardHeader>
                            <CardBody>
                                <CardTitle tag="h4" >{item.name}</CardTitle>
                                <CardText className="text-secondary">{item.title}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    </section>
    );
};

export default ChooseUs;