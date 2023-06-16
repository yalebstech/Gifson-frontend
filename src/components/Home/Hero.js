import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel, CarouselIndicators, CarouselItem, Col, Container, Row } from 'reactstrap';
import '../../App.css';

const items = [
	{
		src: require('../../images/hero/detergent.png')
	},
	{
		src: require('../../images/hero/clothesline.png')
	},
	{
		src: require('../../images/hero/washhouse.png')
	},
	{
		src: require('../../images/hero/dress.jpg')
	},
	
	{
		src: require('../../images/hero/ironing.png')
	},
	{
		src: require('../../images/hero/clothes.png')
	}
];

const Hero = () => {
	const [ activeIndex, setActiveIndex ] = React.useState(0);
	const [ animating, setAnimating ] = React.useState(false);

	const onExiting = () => {
		setAnimating(true);
	};
	const onExited = () => {
		setAnimating(false);
	};
	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};
	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};
	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	return (
		<section id="hero">
			<Container>
				<Row className="py-4">
					<Col md={6} className="py-5">
						<h2>
							Top <span className="color-orange"> Laundry & Dry Cleaning Services </span> In Your Neighbourhood
						</h2>
						<p className="text-justify my-3">
							Gifson laundry services is a laundry Platform, we specialize in
							washing, dry cleaning and laundry. Our services are top notch and we provide you alternative options to choose from our curated cleaning list.
						</p>
						<Link to="/services">
							<Button className="nav-name bg-shape my-4" >
								View Services
							</Button>
						</Link>
					</Col>

					<Col md={6}>
						<Carousel activeIndex={activeIndex} next={next} previous={previous}>
							<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
							{items.map((item) => {
								return (
									<CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
										<img
											src={item.src}
											alt={item.altText}
											height="400px"
											width="600px"
											className="p-5"
										/>
									</CarouselItem>
								);
							})}
							<a
								className="carousel-control-prev"
								data-slide="prev"
								href="#"
								onClick={(e) => {
									e.preventDefault();
									previous();
								}}
								role="button"
							>
								<i className="now-ui-icons arrows-1_minimal-left" />
							</a>
							<a
								className="carousel-control-next"
								data-slide="next"
								href = "#"
								 onClick={(e) => {
									e.preventDefault();
									next();
								 }}
								role="button"
						   >
								<i className="now-ui-icons arrows-1_minimal-right" />
							</a>
						</Carousel>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Hero;
