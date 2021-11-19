import React, { useState } from "react";
import "../../css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faBriefcase,
  faLock,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import AuthService from "../../services/auth/auth-service";
import { connect } from "react-redux";
import {
  SIGN_IN_FAIL_ACTION,
  SIGN_IN_SUCCESS_ACTION,
} from "../../actions/auth/types";

function SignIn({ signInDispatch }) {
  const userData = {
    username: null,
    password: null,
    profile: null,
  };
  const [successful, setSuccessful] = useState(false);
  const [signinData, setSigninData] = useState(userData);
  const [errors, setErrors] = useState({ errors: [] });
  const handleChange = (e) => {
    setSigninData({ ...signinData, [e.target.id]: e.target.value });
  };

  function validateuserData(signin) {
    const errorsForm = [];
    const { profile, username, password } = signin;
    if (!username) {
      errorsForm.push("Veuillez preciser votre Pseudo");
    }
    if (!password) {
      errorsForm.push("le mot de passe est obligatoire ");
    }
    if (!profile) {
      errorsForm.push("Veuillez preciser votre profile");
    }
    setErrors({ ...errors, errors: errorsForm });
    return errorsForm.length === 0;
  }

  const handleSubmit = (e) => {
    const { profile, username, password } = signinData;
    e.preventDefault();

    if (validateuserData(signinData)) {
      AuthService.login(username, profile, password)
        .then((res) => {
          console.log(res);
          setSuccessful(true);
          signInDispatch({
            type: SIGN_IN_SUCCESS_ACTION,
            payload: { username, profile, password, id: res.id },
          });
          //  console.log({username,profile,password,id:res.id});
        })
        .catch((err) => {
          console.log("err", err);
          setErrors({ errors: [err] });
          signInDispatch({ type: SIGN_IN_FAIL_ACTION });
        });
    }
  };

  return (
    <div className="signup-form ">
      <form onSubmit={handleSubmit}>
        <br />
        <ul>
          {errors.errors.map((err) => (
            <li key={err} className="text-danger">
              {err}
            </li>
          ))}
        </ul>
        <div
          hidden={!successful}
          className="alert alert-success justify-content-center"
          role="alert"
        >
          Connexion réussie !
        </div>

        <h2>Connexion</h2>
        <div className="form-group input-container">
          <FontAwesomeIcon icon={faUser} className="icon" />

          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="form-control input-field"
            name="username"
            placeholder="Username"
          />
        </div>
        <br />
        <div className="form-group input-container">
          <FontAwesomeIcon icon={faLock} className="icon" />

          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="form-control input-field"
            name="password"
            placeholder="Password"
          />
        </div>
        <br />
        <div className="form-group input-container">
          <FontAwesomeIcon icon={faBriefcase} className="icon" />
          <select
            id="profile"
            onChange={handleChange}
            className="form-select"
            aria-label="Choisissez votre profile"
          >
            <option defaultValue>Choisissez votre profile</option>
            <option value="locataire">Locataire</option>
            <option value="locateur">Locateur</option>
          </select>
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary col-12 btn-lg btn-block"
          >
            Se connecter
          </button>
        </div>
        <div className="text-center">
          Pas de compte?{" "}
          <Link to={"/signup"} className="nav-link">
            Inscrivez-vous{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return { signInDispatch: (action) => dispatch(action) };
}

export default connect(null, mapDispatchToProps)(SignIn);
