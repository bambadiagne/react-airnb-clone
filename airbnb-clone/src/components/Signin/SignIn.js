import { React } from "react";
import '../../css/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from "react-router-dom";
import { faEnvelope, faLock,faUser} from '@fortawesome/fontawesome-free-solid';

export default function SignIn() {

    return <div className="signup-form ">
        <form ><br />
            <h2>Connexion</h2>
            <div className="form-group input-container">
                 <FontAwesomeIcon icon={faUser} className="icon" />
       
                <input type="email" className="form-control input-field" name="email" placeholder="Email" required="required" />
            </div><br />
            <div className="form-group input-container">
                 <FontAwesomeIcon icon={faLock} className="icon" />
       
                <input type="password" className="form-control input-field" name="password" placeholder="Password" required="required" />
            </div><br />

            <div className="form-group">
                <button type="submit" className="btn btn-primary col-12 btn-lg btn-block">Se connecter</button>

            </div>
            <div class="text-center">Pas de compte?        <Link to={"/signup"} className="nav-link">
                Inscrivez-vous  </Link>
            </div>
        </form>

    </div>
}