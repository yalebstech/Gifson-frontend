import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledCollapse,
  UncontrolledDropdown
} from "reactstrap";

import userPhoto from "../../images/auth/man.png";
import Logo from "../../images/Gifson-logo1.png";
import { useAuth, resendverificationEmail } from "../Authentication/useAuth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faServicestack } from "@fortawesome/free-brands-svg-icons";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../Authentication/useAuth";
import { ToastContainer} from 'react-toastify';
import "../../App.css";
import 'react-toastify/dist/ReactToastify.css';

library.add(faServicestack);


const Header = props => {
  const auth = useAuth();
  const authUser = getAuth();
  const history = useHistory();
  const [modalLive, setModalLive] = useState(false);

  const totalQuantity = props.cart.reduce((totalQuantity, product) => {
    return totalQuantity + product.quantity;
  }, 0);

  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imagesListRef).then(response => {
      response.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImageUrls(prev => [...prev, url]);
        });
      });
    });
  }, []);

  updateProfile(authUser.currentUser, {
      photoURL: Array.from(imageUrls.values()).pop()
    })
      .then(() => {})
      .catch(error => {})

return (
    <Navbar className="sticky-top" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand onClick={e => e.preventDefault()}>
            <div className="row align-items-center">
              <Link to="/">
                <img style={{ width: "130px" }} src={Logo} alt="Gifson logo" />
              </Link>
            </div>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-danger" type="button">
            <i className="text-white now-ui-icons arrows-1_minimal-down" />
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
            <span className="navbar-toggler-bar bar4" />
            <span className="navbar-toggler-bar bar5" />
          </button>
        </div>

        <UncontrolledCollapse navbar toggler="#navbar-danger">
          <Nav className="ml-auto" navbar>
            <NavItem>
            
              <Link to="/">
                <NavLink>
                  <i className="now-ui-icons shopping_shop" />
                  <p className="nav-name">Home</p>
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>

              <Link to="/services">
                <NavLink>
                  <span className="now-ui-icons spin">
                    <FontAwesomeIcon icon={faServicestack} size="lg" />
                  </span>
                  <p className="nav-name">Services</p>
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/cart-and-shipment">
                <NavLink>
                  <i className="now-ui-icons shopping_bag-16" />
                  <p className="nav-name">
                    Cart
                    {totalQuantity ? (
                      <span className="badge ml-1">{totalQuantity}</span>
                    ) : (
                      <span />
                    )}
                  </p>
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/dashboard">
                <NavLink>
                  <i className="now-ui-icons objects_spaceship" />
                  <p className="nav-name">Dashboard</p>
                </NavLink>
              </Link>
            </NavItem>

            {/* user signed in nav show */}
            <NavItem>
              {auth.user ? (
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    data-toggle="dropdown"
                    id="navbarDropdownMenuLink"
                    nav
                    onClick={e => e.preventDefault()}
                    >
                    {auth.user.displayName}
                    <img
                      className="ml-3"
                      src={userPhoto}
                      width="35px"
                      alt="user"
                    />
                  </DropdownToggle>

                  <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                    <DropdownItem
                      onClick={() => {
                        auth.user.emailVerified
                          ? history.push("/profile")
                          : setModalLive(true);
                      }}
                    >
                      My Profile
                    </DropdownItem>
               
                    <DropdownItem
                      onClick={() => {
                        auth.signOut();
                      }}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <Link to="/login">
                  <NavLink>
                    <i className="now-ui-icons users_single-02" />
                    <p className="nav-name">Login</p>
                  </NavLink>
                </Link>
              )}
            </NavItem>
            <ToastContainer />
          </Nav>
        </UncontrolledCollapse>

        {/* modal to verify email */}
        <Modal toggle={() => setModalLive(false)} isOpen={modalLive}>
          <div className="modal-header">
            <h5 className="modal-title text-danger" id="exampleModalLiveLabel">
              Email Verification
            </h5>
            <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={() => setModalLive(false)}
              >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Verify your email</p>
          </div>
          <div className="modal-footer pl-2 pr-2 d-flex justify-content-between">
            <Button
              color="danger"
              type="button"
              onClick={() => setModalLive(false)}
            >
              Close
            </Button>

            <Button
              color="primary"
              type="button"
              onClick={() => resendverificationEmail()}
              >
              Resend verification email
            </Button>
           
            <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
              <Button
                color="success"
                type="button"
                onClick={() => setModalLive(false)}
        
               >
                Go to Email Inbox or spam to verify
              </Button>
            </a>
            
          </div>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default Header;
