import React, { useState } from "react";
import "../../css/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faLock,
  faUserClock,
  faUser,
  faBriefcase,
} from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthService from "../../services/auth/auth-service";

import TDatePicker from "../DatePicker/DatePicker";
import {
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAIL_ACTION,
} from "../../actions/auth/types";
function SignUp({ signUpDispatch }) {
  const dispatchAction = signUpDispatch;
  const [successful, setSuccessful] = useState(false);
  const [birthDate, setStartDate] = useState(new Date());
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState({ errors: [] });
  const userData = {
    first_name: null,
    last_name: null,
    mail_address: null,
    birth_date: "",
    gender: null,
    confirmationPassword: null,
    username: null,
    password: null,
  };
  const [signupData, setSignupData] = useState(userData);
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function validateuserData(signup) {
    const errorsForm = [];
    const {
      first_name,
      last_name,
      confirmationPassword,
      mail_address,
      gender,
      password,
      profile,
      birth_date,
    } = signup;
    if (!gender) {
      errorsForm.push("Le genre est obligatoire");
    }

    if (!first_name) {
      errorsForm.push("Le prenom est obligatoire");
    }
    if (!last_name) {
      errorsForm.push("Le nom est obligatoire");
    }
    if (!confirmationPassword) {
      errorsForm.push("la confirmation de mdp est obligatoire");
    }

    if (password !== confirmationPassword) {
      errorsForm.push("Les mots de passe ne correspondent pas");
    }
    if (!validateEmail(mail_address)) {
      errorsForm.push("Format email incorrecte");
    }
    if (!profile) {
      errorsForm.push("le profile est obligatoire ");
    }
    if (profile !== "locataire" && profile !== "locateur") {
      errorsForm.push("Profile Inconnu");
    } else {
      setProfile(profile);
    }
    setErrors({ ...errors, errors: errorsForm });
    return errorsForm.length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user;

    if (validateuserData(signupData)) {
      if (profile === "locataire") {
        user = {
          ...signupData,
          birth_date: birthDate.toISOString().split("T")[0],
          balance: 0,
          profile: profile,
        };
      } else {
        user = {
          ...signupData,
          birth_date: birthDate.toISOString().split("T")[0],
          benefits: 0,
          profile: profile,
        };
      }
      console.log("user", user);
      try {
        const res = await AuthService.register(user);
        setSuccessful(true);
        dispatchAction({ type: SIGN_UP_SUCCESS_ACTION });
      } catch (err) {
        dispatchAction({ type: SIGN_UP_FAIL_ACTION });
      }
    }
  };

  return (
    <div className="container-fluid home">
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
            className="alert alert-success"
            role="alert"
          >
            Compte créé avec succès !
          </div>
          <h2>Inscription</h2>

          <div className="form-group">
            <div className="row">
              <div className="col input-container">
                <FontAwesomeIcon icon={faUser} className="icon" />

                <input
                  onChange={handleChange}
                  type="text"
                  id="first_name"
                  className="form-control input-field"
                  name="first_name"
                  placeholder="Prenom"
                />
              </div>

              <div className="col input-container">
                <FontAwesomeIcon icon={faUser} className="icon" />

                <input
                  type="text"
                  onChange={handleChange}
                  id="last_name"
                  className="form-control input-field"
                  name="last_name"
                  placeholder="Nom"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col input-container">
                <FontAwesomeIcon icon={faUser} className="icon" />

                <input
                  onChange={handleChange}
                  type="text"
                  id="username"
                  className="form-control input-field"
                  name="username"
                  placeholder="Pseudo"
                />
              </div>
            </div>
          </div>

          <div className="form-group input-container">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="mail_address"
              onChange={handleChange}
              id="mail_address"
              className="form-control input-field"
              name="email"
              placeholder="Email"
            />
          </div>
          <label htmlFor="date">Date de naissance</label>
          <div className="form-group input-container">
            <FontAwesomeIcon icon={faUserClock} className="icon" />

            <TDatePicker
              selected={birthDate}
              setStartDate={setStartDate}
              className="form-control "
            />
          </div>

          <div className="form-group input-container">
            <FontAwesomeIcon icon={faLock} className="icon" />

            <input
              type="password"
              onChange={handleChange}
              id="password"
              className="form-control input-field"
              name="password"
              placeholder="Mot de passe"
            />
          </div>

          <div className="form-group input-container">
            <FontAwesomeIcon icon={faLock} className="icon" />

            <input
              type="password"
              onChange={handleChange}
              id="confirmationPassword"
              className="form-control input-field"
              name="confirmationPassword"
              placeholder="Confirmation Mot de passe"
            />
          </div>
          <div className="form-group input-container">
            <FontAwesomeIcon icon={faBriefcase} className="icon" />
            <select
              id="gender"
              onChange={handleChange}
              className="form-select"
              aria-label="Sexe"
            >
              <option defaultValue>Sexe</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

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

          <div className="form-group ">
            <button
              type="submit"
              className="col-12 btn btn-primary btn-lg btn-block"
            >
              <FontAwesomeIcon
                key={"plane1"}
                icon={faPaperPlane}
                style={{ float: "left" }}
              />
              S'inscrire{" "}
              <FontAwesomeIcon
                key={"plane2"}
                icon={faPaperPlane}
                style={{ float: "right" }}
              />
            </button>
          </div>
          <div className="text-center">
            Déjà un compte?<Link to={"/signin"}>Se connnecter </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { signUpDispatch: (action) => dispatch(action) };
}

export default connect(null, mapDispatchToProps)(SignUp);
