import React from 'react';
import { connect } from 'react-redux';
import {  Link } from "react-router-dom";
import '../../css/navbar.css';

function Navbar ({userStatus}) {

return <div className="container"> <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <a className="navbar-brand" href="#">CAR DEALER</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto topnav">
              <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#"></a>
              </li>
              <li className="nav-item">
                 < Link to={"/chambres"} className="nav-link">
                   Liste des Chambres
                  </Link>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#">Clearence Event</a>
              </li>
              <li hidden={!userStatus.isLoggedIn || userStatus.profile==="locateur"} style={{marginLeft:"2px"}} className="nav-item">
              <Link  to={"/reservations"} className="nav-link btn btn-success text-white float-right">
                    Mes reservations       
              </Link>
              </li>
              <li hidden={!userStatus.isLoggedIn || userStatus.profile==="locataire"} style={{marginLeft:"2px"}} className="nav-item">
              <Link  to={"/signup"} className="nav-link btn btn-success text-white float-right">
                    Annonces       
              </Link>
              </li>
              <li hidden={!userStatus.isLoggedIn} style={{marginLeft:"2px"}} className="nav-item" >
              <Link to={"/profile"} className="nav-link btn btn-danger text-white float-right">
                   Mon profile       
              </Link>
              </li>
           
              <li hidden={userStatus.isLoggedIn} style={{marginLeft:"2px"}} className="nav-item">
              <Link  to={"/signup"} className="nav-link btn btn-success text-white float-right">
                    Inscription       
              </Link>
              </li>
              <li hidden={userStatus.isLoggedIn} style={{marginLeft:"2px"}} className="nav-item" >
              <Link to={"/signin"} className="nav-link btn btn-danger text-white float-right">
                    Connexion       
              </Link>
              </li>
          </ul>
              <Link to={"/signin"} hidden={!userStatus.isLoggedIn} style={{marginLeft:"5px",float:"right"}}  className="nav-link btn btn-danger text-white float-right">
                    Deconnexion       
              </Link>
          
      </div>
</nav>
</div>
}
function mapStateToProps(state) {
    
    return {
      userStatus:state.auth,
    };
  }
  
export default connect(mapStateToProps,null)(Navbar);
