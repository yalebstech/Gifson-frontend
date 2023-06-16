import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../../App.css';
import Laundry from '../../images/hero/laundry_wash_dry.svg';

const About = () => {
	return (
        <section  id="about-us">
		<Container>
			<div className="d-flex justify-content-center mb-4">
				<h2 className="head-title color-reuse mt-5">About Us</h2>
			</div>
			<Row>
				<Col md={6} className="d-flex justify-content-center">
					<img src={Laundry} alt="Logo"/>
				</Col>
				<Col md={6}>
					<p className="text-justify mb-5">
						Gifson laundry services specialize in ironing,
						dry cleaning and laundry. Our services provide you with clean laundry in the shortest possible turnaround.
						We are a call away and we are ready to receive orders!
					</p>
				</Col>
			</Row>
		</Container>
        </section>
	);
};

export default About;
