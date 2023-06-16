import {
  faEnvelope,
  faLockOpen,
  faUser,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import facebook from "../../images/auth/facebook.svg";
import google from "../../images/auth/google.svg";
import loginPic from "../../images/auth/signin1.png";
import registerPic from "../../images/auth/log.svg";
import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";


const Login = () => {
  const [toggled, setToggled] = useState(false);
  const buttonClass = toggled ? "containerz sign-up-mode" : "containerz";

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const auth = useAuth();

  const handleBlur = e => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  };

  const onSubmitOld = e => {
    e.preventDefault();
    if (user.email && user.password) {
      auth.signIn(user.email, user.password);
    } 
};

  const onSubmitNew = data => {
    if (data.name && data.email && data.password && data.confirm_password) {
      auth.signUp(data.email, data.confirm_password, data.name);
    }
  };

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  // useEffect(() => {
  //   const keyDownHandler = event => {
  //     if (event.key === 13) {
  //       onSubmitOld();
  //     }
  //   };
  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  return (
    <section id="Amazing-Login-Page">
      <div className={buttonClass}>
        <div className="forms-containerz">
          <div className="signin-signup">
            {/* Sign In Section*/}
            <form onSubmit={onSubmitOld} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              {
                (auth.user = null && (
                  <p className="text-danger">{auth.user.error}</p>
                ))
              }

              <div className="input-field">
                <FontAwesomeIcon icon={faEnvelope} className="input-fieldi" />
                <input
                  name="email"
                  ref={register({ required: true })}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
              </div>

              {errors.email && <span className="error">Email is required</span>}
              <div className="input-field">
              <div style={{ display: isPasswordShown ? "none" : "block" }}>
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="input-fieldi"
                  onClick={handleShowPassword}
                />
                </div>
                <div style={{ display: isPasswordShown ? "block" : "none" }}>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="input-fieldi"
                    onClick={handleShowPassword}       
                  />
                </div>
                <input
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  ref={register({ required: true })}
                  onBlur={handleBlur}
                  placeholder="Password"
                />
              </div>

              {errors.password && (
                <span className="error">Password is required</span>
              )}

              <div>
                {/* signin ntify */}
                <ToastContainer />
                <button className="btnz" type="submit">
                  Sign In
                </button>
              </div>

              <p className="forget-text">
                <Link to="/reset-password">Forgot your password?</Link>
              </p>

              {/* social media sign in */}
              {/* <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <button
                  className="social-icon"
                  type="submit"
                  onClick={auth.signInWithGoogle}
                >
                  <img src={google} width="25px" alt="google" />
                  <span className="mx-2">Sign in with Google</span>
                </button>

                <button
                  className="social-icon"
                  onClick={auth.signInWithFacebook}
                  type="submit"
                >
                  <img src={facebook} width="27px" alt="facebook" />
                  <span className="mx-2">Sign in with Facebook </span>
                </button>
              </div> */}
            </form>


            {/* Sign up section */}
            <form onSubmit={handleSubmit(onSubmitNew)} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              {auth.user != null && (
                <p className="text-danger">{auth.user.error}</p>
              )}

              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="input-fieldi" />
                <input
                  name="name"
                  ref={register({
                    required: "Name is required",
                    pattern: {
                      value: /^(?=^.{6,20}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/i,
                      message:
                        "Name must be 6 - 20 characters & Minimum 2 words"
                    }
                  })}
                  placeholder="Name"
                />
              </div>
              <span className="error">
                {errors.name && errors.name.message}
              </span>

              <div className="input-field">
                <FontAwesomeIcon icon={faEnvelope} className="input-fieldi" />
                <input
                  name="email"
                  ref={register({
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Email"
                />
              </div>
              <span className="error">
                {errors.email && errors.email.message}
              </span>

              <div className="input-field">
              <div style={{ display: isPasswordShown ? "none" : "block" }}>
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="input-fieldi"
                  onClick={handleShowPassword}
                />
                </div>
                <div style={{ display: isPasswordShown ? "block" : "none" }}>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="input-fieldi"
                    onClick={handleShowPassword}       
                  />
                </div>
                <input
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  ref={register({
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&;:])[A-Za-z\d@$!%*#?&;:]{8,}$/i,
                      message:
                        "Minimum eight characters, at least one letter, one number and one special character"
                    }
                  })}
                  placeholder="Password"
                />
              </div>
              <div className="error">
                {errors.password && errors.password.message}
              </div>

              <div className="input-field">
                <FontAwesomeIcon icon={faLockOpen} className="input-fieldi" />
                <input
                  type="password"
                  name="confirm_password"
                  ref={register({
                    validate: value => value === watch("password")
                  })}
                  placeholder="Confirm Password"
                />
              </div>
              {errors.confirm_password && (
                <span className="error">Passwords don't match.</span>
              )}

              <button className="btnz" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>Register with us now!!!</p>
              <button
                className="btnz transparent"
                onClick={() => setToggled(!toggled)}
                id="sign-up-btn"
                type="submit"
              >
                Sign up
              </button>
            </div>
            <img src={loginPic} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>Already have an account? Sign In</p>
              <button
                className="btnz transparent"
                onClick={() => setToggled(!toggled)}
                id="sign-in-btn"
                type="submit"
              >
                Sign in
              </button>
            </div>
            <img src={registerPic} className="image" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
