import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import { useAuth } from "../Authentication/useAuth";
import Cart from "./Cart";
import "./Cart.css";


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

const Bag = props => {
  const auth = useAuth();

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();

  const [success, setSuccess] = useState(false);

  const {
    fullName,
    email,
    mobileNumber,
    toDoor,
    road,
    flat,
    address
  } = props.deliveryDetails;

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    setSuccess(true);
  };

  const handleBlur = e => {
    const newUserInfo = { ...props.deliveryDetails };
    newUserInfo[e.target.name] = e.target.value;
    if (newUserInfo.fullName === null) {
      newUserInfo.fullName = auth.user.displayName;
    }
    if (newUserInfo.email === null) {
      newUserInfo.email = auth.user.email;
    }
    props.deliveryDetailsHandler(newUserInfo);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col md={7}>
            <h4 className="service-text-color">
              Edit Pickup & Delivery Details
            </h4>
            <hr />

            <div className="address-details px-2 mb-3">
              <form onSubmit={handleSubmit(onSubmit)} className="py-2">
                <div>
                  <h5 className="service-text-color">
                    <i className="now-ui-icons shopping_delivery-fast mr-2" />
                    Schedule
                  </h5>
                  <span className="from-text">
                    Expert will arrive at your given address
                  </span>
                </div>

                <TextField
                  name="getDate"
                  id="date"
                  label="Pickup Date"
                  type="date"
                  // defaultValue={getDate}
                  onBlur={handleBlur}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <TextField
                  name="getTime"
                  id="time"
                  label="Pickup Time"
                  type="time"
                  // defaultValue={getTime}
                  onBlur={handleBlur}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  // inputProps={{
                  //   step: 300
                  // }}
                />
                 {errors.getTime && (
                    <span className="errorMessage">nearest time</span>
                  )}
                <div>
                  <h5 className="service-text-color">
                    <i className="now-ui-icons business_badge mr-2" />
                    Contact Person
                  </h5>
                  <span className="from-text">
                    Expert will arrive at the address given below
                  </span>
                </div>

                <FormGroup>
                  <input
                    name="fullName"
                    className="form-control my-3"
                    ref={register({ required: true })}
                    defaultValue={fullName || auth.user.displayName}
                    onBlur={handleBlur}
                    placeholder="Full Name"
                  />
                  {errors.fullName && (
                    <span className="errorMessage">Name is required</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <input
                    name="email"
                    className="form-control my-3"
                    ref={register({ required: true })}
                    defaultValue={email || auth.user.email}
                    onBlur={handleBlur}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="errorMessage">Email is required</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <input
                    name="mobileNumber"
                    className="form-control my-3"
                    ref={register({ required: true })}
                    defaultValue={mobileNumber}
                    onBlur={handleBlur}
                    placeholder="Mobile Number"
                  />
                  {errors.mobileNumber && (
                    <span className="errorMessage">
                      Mobile Number is required
                    </span>
                  )}
                </FormGroup>

                <div className="mt-4">
                  <h5 className="service-text-color">
                    <i className="now-ui-icons location_pin mr-2" />
                    Address
                  </h5>
                  <span className="from-text">
                    Expert will arrive at the address given below
                  </span>
                </div>

                <FormGroup>
                  <input
                    name="toDoor"
                    className="form-control my-3"
                    ref={register({ required: true })}
                    defaultValue={toDoor}
                    onBlur={handleBlur}
                    placeholder="Delivery To Door"
                  />
                  {errors.toDoor && (
                    <span className="errorMessage">
                      This Option is required
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <input
                    name="road"
                    className="form-control my-3"
                    ref={register({ required: true })}
                    defaultValue={road}
                    onBlur={handleBlur}
                    placeholder="Road Name"
                  />
                  {errors.road && (
                    <span className="errorMessage">Road No is required</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <input
                    name="flat"
                    className="form-control my-3"
                    ref={register({ required: true })}
                    defaultValue={flat}
                    onBlur={handleBlur}
                    placeholder="Flat Name or Floor"
                  />
                  {errors.flat && (
                    <span className="errorMessage">
                      Flat or Floor Name is required
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <textarea
                    name="address"
                    ref={register({ required: true })}
                    defaultValue={address}
                    onBlur={handleBlur}
                    placeholder="Address"
                    className="form-control my-3"
                    cols="30"
                    rows="2"
                  />
                  {errors.address && (
                    <span className="errorMessage">Address is required</span>
                  )}
                </FormGroup>

                <div className="mt-4 mb-3">
                  <h5 className="service-text-color">
                    <i className="now-ui-icons business_money-coins mr-2" />
                    Payment Method
                  </h5>
                  <span className="from-text">Choose your payment option:</span>
                </div>

                <FormGroup check className="form-check-radio" onClick = {props.handleCashCheck} inline>
                  <Label check>
                    <Input      
                      defaultValue="lineOption1"
                      id="cash"
                      name="inlineRadioOptions"
                      type="radio"
                    />
                      Cash on delivery <span className="form-check-sign" />
                  </Label>
                </FormGroup>

                <FormGroup check className="form-check-radio" onClick = {props.handleonlineCheck} inline>
                  <Label check>
                    <Input
                      // defaultChecked
                      defaultValue="lineOption2"
                      id="online"
                      name="inlineRadioOptions"
                      type="radio"
                     />
                     Pay online <span className="form-check-sign" />
                  </Label>
                </FormGroup>


                <div className="form-group d-flex justify-content-center mt-4">
                  <button className="btn service-bg" type="submit">
                    <i className="now-ui-icons ui-1_check" />
                    <span className="ml-2">Save & Continue</span>
                  </button>
                </div>
              </form>
            </div>
          </Col>

          <Col md={5} className="mb-5">
            <Cart
              cart={props.cart}
              deliveryDetails={props.deliveryDetails}
              finalCart={props.finalCart}
              handleAddProduct={props.handleAddProduct}
              handleRemoveProduct={props.handleRemoveProduct}
              finalCartHandler={props.finalCartHandler}
              success={success}
              deliveryDetailsHandler={props.deliveryDetailsHandler}
              clearCart={props.clearCart}
              clearDeliveryDetails={props.clearDeliveryDetails}
              onlinePayment = {props.onlinePayment}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Bag;
