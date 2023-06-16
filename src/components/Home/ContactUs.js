import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";
import {db, useAuth} from "../Authentication/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";


const useStyles = makeStyles(theme => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2)
    }
  }
}));


const ContactUs = () => {
  const auth = useAuth();
  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loader, setLoader] = useState(false);

  const { name, email, phone, message } = state;


 const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      toast.error("Please provide value in each input field");
    } else if(auth.user == null){
      toast.error("You must be logged in to contact us");
      window.location.replace('/login')
    }else{
      setLoader(true);
      db.collection("contacts")
        .add(state)
        .then(() => {
          toast.success("Form Submitted Successfully👍");
          setLoader(false);
        })
        .catch(error => {
            toast.error(error.message)
          setLoader(false);
        });
    }
  };

  const handleInputChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <section id="contactUs" className="mb-5">
      <ToastContainer />
      <Container>
        <div className="d-flex justify-content-center mb-4">
          <h2 className="color-reuse head-title mt-1">Contact Us</h2>
        </div>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="exampleFormControlInput1">Full Name</label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="Your full name"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={name}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlInput1">Email Address</label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="yourmail.com"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={email}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlInput1">Phone Number</label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="01XXX XXX XXX"
                  type="number"
                  name="phone"
                  onChange={handleInputChange}
                  value={phone}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlTextarea1">
                  Your Message
                </label>
                <Input
                  id="exampleFormControlTextarea1"
                  rows="2"
                  type="textarea"
                  name="message"
                  onChange={handleInputChange}
                  value={message}
                />
              </FormGroup>
              <Button className="nav-name bg-shape" type="submit">
                <i className="now-ui-icons ui-1_send" /> Submit
              </Button>
            </Form>

          </Col>
          <Col md={6} className="pl-5">
            <div className="my-4">
              <h3 className="text-primary">
                Get in touch, send us an email or call us
              </h3>
            </div>
            <p>
              We -
              <strong className="text-dark">
                provide optimal laundry service to satisfy our customers
                impeccable desire
              </strong>
            </p>

            <h4 className="color-reuse">
              <i className="now-ui-icons tech_mobile" />
              +2347026879779
            </h4>
            <h4 className="color-reuse">
              <i className="now-ui-icons ui-1_email-85" /> gifsonmate@gmail.com
            </h4>
            <div className={classes.root}>
              <span className="color-reuse">Follow us on </span>
              <a href = "https://facebook.com/gifsonlaundry" ><FacebookIcon style={{ color: "#fe7b60" }} /></a>
              <a href = "https://www.instagram.com/gifsonlaundry_service/"><InstagramIcon style={{ color: "#fe7b60" }} /></a> 
              <a href = "https://www.linkedin.com/in/gifsonlaundry/"><LinkedInIcon style={{ color: "#fe7b60" }} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
