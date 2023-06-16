import {
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { resetPassword, useAuth } from "./useAuth";


const Reset = () => {
  const [toggled, setToggled] = useState(false);
  const buttonClass = toggled ? "containerz sign-up-mode" : "containerz";

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { register, errors } = useForm();

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
    } else {
      
    }
  };

return (
    <section >
      <div className={buttonClass}>
        <div className="forms-containerz">
          <div className="signin-signup">
            {/* Sign In Submit */}
            <form onSubmit = {onSubmitOld} className="sign-in-form">
              <h2 className="title">Enter Your Registered Email</h2>
              {auth.user != null && (
                <p className="text-danger">{auth.user.error}</p>
              )}

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
              <button
                className="btnz"
                type="submit"
                onClick={() => resetPassword(user.email)}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reset;
