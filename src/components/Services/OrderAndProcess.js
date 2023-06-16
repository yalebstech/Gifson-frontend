import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import React from "react";
import {
  Col,
  Container,
  Row
} from "reactstrap";
import "./Services.css";



const OrderAndProcess = () => {
  return (
    <Container>
      <Row className="my-2">
        <Col md={6}>
          <h2 className="service-text-color head-title mt-5 text-capitalize">
            How to order
          </h2>

          <Timeline className="orderList">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <AssignmentTurnedInIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="h1">
                  Select Service
                </Typography>
                <Typography>
                  From the category, select the service you are looking for.
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <ScheduleIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="h1">
                  Set Schedule
                </Typography>
                <Typography>Select your convenient time slot.</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <LocalMallIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="h1">
                  Place Order
                </Typography>
                <Typography>
                  Confirm your order by clicking ‘Place order’.
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Col>

        {/* <div>
						<h2 className="service-text-color head-title mt-3">Terms & Condition</h2>
						<div className="terms mb-5">
							<li className="mt-3">
								After service completion you have to pay through online or Cash on Delivery.
							</li>
							<li className="mt-3">
								Price may differ due to product fabrication and measurement of their length. It will be
								based on our respective Service Provider’s inspection.
							</li>
							<li className="mt-3">
								Service Delivery time might extended or changes due to product fabrics as in leather
								Jacket, Carpet etc.
							</li>
							<li className="mt-3">
								Delivery time also might changed upon transportation crisis like strikes and road
								blocks.
							</li>
							<li className="mt-3">
								Minimum Order Amount is BDT 100 for free pick and drop service, otherwise you have to
								pay additional BDT 20 as charge.
							</li>
						</div>
					</div> */}

        <Col md={6} className="mobileView">
          <h2 className="service-text-color head-title mt-5 ml-5">
            Service Deliverable
          </h2>
          <p className="text-justify story ml-5">
            We offer fast and reliable services. We wash, pack and preserve your
            clothes.We also deliver your clothes on order.
            <li className="mt-3">Quick response to order.</li>
            <li>Best Product, Best Service.</li>
            <li>Guaranteed Customer Satisfaction.</li>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderAndProcess;
