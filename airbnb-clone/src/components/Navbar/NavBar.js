import React from 'react';
import {  Link } from "react-router-dom";
import '../../css/navbar.css';
export default function Navbar () {

return <div className="container"> <nav className="navbar navbar-expand-lg navbar-light bg-warning">
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
              <li className="nav-item">
                  
                  <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
              </li>
            
              <li style={{marginLeft:"2px"}} className="nav-item">
              <Link to={"/signup"} className="nav-link btn btn-primary text-white float-right">
                    Inscription       
              </Link>
              </li>
              <li style={{marginLeft:"2px"}} className="nav-item" >
              <Link to={"/signin"} className="nav-link btn btn-danger text-white float-right">
                    Connexion       
              </Link>
              </li>
          </ul>
          
      </div>
</nav>
</div>
}