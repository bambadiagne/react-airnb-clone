import { faUser } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_ACTION } from "../../actions/auth/types";
import "../../css/navbar.css";
import AuthService from "../../services/auth/auth-service";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.js";

function Navbar({ userStatus, logOutDispatch }) {
  const user = userStatus.user;
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  function logoutUser(a) {
    AuthService.logout();
    logOutDispatch({ type: LOGOUT_ACTION });
    window.location = "/";
  }

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-primary">
      <Link className="navbar-brand" to="/">
        AIRBNB
      </Link>
      <button
        className="navbar-toggler"
        onClick={handleNavCollapse}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav topnav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/"></Link>
          </li>
          <li className="nav-item">
            <Link to={"/rooms"} className="nav-link">
              Chambres
            </Link>
          </li>
          {!userStatus.isLoggedIn ? (
            ""
          ) : (
            <li className="nav-item">
              <Link to={"/reservations"} className="nav-link">
                Reservations
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto ">
          {!userStatus.isLoggedIn || (user && user.profile === "locateur") ? (
            ""
          ) : (
            <Link
              style={{ marginLeft: "5px" }}
              to={"/reservations"}
              className="nav-link  btn btn-success text-white "
            >
              Mes reservations
            </Link>
          )}

          {!userStatus.isLoggedIn || (user && user.profile === "locataire") ? (
            ""
          ) : (
            <Link
              style={{ marginLeft: "5px" }}
              to={"/annonces"}
              className="nav-link  btn btn-success text-white "
            >
              Annonces
            </Link>
          )}
          {!userStatus.isLoggedIn ? (
            ""
          ) : (
            <Link
              style={{ marginLeft: "5px" }}
              to={"/profile"}
              className="= nav-link  btn btn-danger text-white "
            >
              Mon profile
            </Link>
          )}
          {userStatus.isLoggedIn ? (
            ""
          ) : (
            <Link
              style={{ marginLeft: "5px" }}
              to={"/signup"}
              className="nav-link  btn btn-success text-white "
            >
              Inscription
            </Link>
          )}
          {userStatus.isLoggedIn ? (
            ""
          ) : (
            <Link
              style={{ marginLeft: "5px" }}
              to={"/signin"}
              className="nav-link  btn btn-danger text-white "
            >
              Connexion
            </Link>
          )}

          {!userStatus.isLoggedIn ? (
            ""
          ) : (
            <button
              onClick={logoutUser}
              style={{ marginLeft: "5px" }}
              className="nav-link  btn btn-danger text-white "
            >
              Deconnexion
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
function mapStateToProps(state) {
  return {
    userStatus: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return { logOutDispatch: (action) => dispatch(action) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
