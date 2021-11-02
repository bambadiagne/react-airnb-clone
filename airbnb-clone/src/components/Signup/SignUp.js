import React from 'react';
import '../../css/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock,faUser} from '@fortawesome/fontawesome-free-solid';
import {  Link } from "react-router-dom";

export default function SignUp() {

    return <div className="signup-form ">
        <form ><br />
            <h2>Inscription</h2>
            <div className="form-group">
                <div className="row">
                    <div className="col input-container">
                    <FontAwesomeIcon icon={faUser} className="icon" />
       
                        <input type="text" className="form-control input-field" name="first_name" placeholder="Prenom" required="required" />
                        </div>

                    <div className="col input-container">
                    <FontAwesomeIcon icon={faUser} className="icon" />
       
                        <input type="text" className="form-control input-field" name="last_name" placeholder="Nom" required="required" />
                        </div>
                </div>
            </div>
            <div className="form-group input-container">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input type="email" className="form-control input-field" name="email" placeholder="Email" required="required" />
            </div>
            <div className="form-group input-container">
                <FontAwesomeIcon icon={faLock} className="icon" />

                <input type="password" className="form-control input-field" name="password" placeholder="Mot de passe" required="required" />
            </div>
            <div className="form-group input-container">
                <FontAwesomeIcon icon={faLock} className="icon" />

                <input type="password" className="form-control input-field" name="confirm_password" placeholder="Confirmation Mot de passe" required="required" />
            </div>
            <div className="form-group">
                <button type="submit" className="col-12 btn btn-primary btn-lg btn-block">S'inscrire</button>

            </div>
            <div className="text-center">Déjà un compte?<Link to={'/signin'}>Se connnecter </Link> </div>
  
        </form>
    </div>

}
