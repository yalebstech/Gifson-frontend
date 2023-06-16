import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { resetPassword, useAuth } from "../../Authentication/useAuth";
import "./Signin.css";

const AdminLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { register, errors } = useForm();
  const auth = useAuth();

  const onSubmitAdmin = e => {
    e.preventDefault();
    if (user.email && user.password) {
      auth.signInAdmin(user.email, user.password);
	} 
	};

	const handleBlur = e => {
		const newUserInfo = { ...user };
		newUserInfo[e.target.name] = e.target.value;
		setUser(newUserInfo);
	  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="text-center py-4">
          <Link to="/admin" class="text-info nav-link">
            <h2>Gifson Admin Pannel</h2>
          </Link>
        </div>
        <form onSubmit={onSubmitAdmin} className="py-3">
          <h1 className="lead text-center py-3">Welcome back!</h1>
          {
            (auth.user = null && (
              <p className="text-danger"> {auth.user.error}</p>
            ))
          }

          <div className="form-group my-4">
            <input
              name="email"
              className="form-control"
              ref={register({ required: true })}
			  placeholder="Email"
			  onBlur={handleBlur}
            />
            {errors.email && <span className="error">Email is required</span>}
          </div>

          <div className="form-group my-4">
            <input
              type="password"
              name="password"
              className="form-control"
              ref={register({ required: true })}
			  placeholder="Password"
			  onBlur={handleBlur}
            />
            {errors.password && (
              <span className="error">Password is required</span>
            )}
          </div>
          <p
            className="forget-text"
            onClick={() => resetPassword(auth.user.email)}
          >
            Forgot your password?
          </p>

          <div className="form-group text-center">
            <button className="btn btn-primary w-25" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
