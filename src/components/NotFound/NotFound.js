import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <br />
    <br />
    <br />
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">Page inexistante.</div>
            <Link to="/rooms" className="btn btn-lg btn-success">
              Revenir à l'acceuil
            </Link>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
);

export default NotFound;
