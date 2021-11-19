import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faBriefcase,
  faDollarSign,
  faHome,
  faLock,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import NewRoom from "../Room/NewRoom/NewRoom";

export default function Annonce() {
  const [showPart, setShowPart] = useState({
    annonces: false,
    reservations: false,
    creationChambre: false,
  });
  return (
    <div>
      <br /> <br /> <br />
      <h1 className="text-center text-white">Gestion annonces</h1>
      <div>
        <div className="d-flex mx-auto ">
          <button
            onClick={() =>
              setShowPart({
                ...showPart,
                annonces: false,
                reservations: false,
                creationChambre: true,
              })
            }
            className="btn btn-primary "
            style={{ margin: "1%" }}
          >
            Création chambre
          </button>
          <button
            onClick={() =>
              setShowPart({
                ...showPart,
                annonces: false,
                reservations: true,
                creationChambre: false,
              })
            }
            className="btn btn-primary "
            style={{ margin: "1%" }}
          >
            Reservations
          </button>
          <button
            onClick={() =>
              setShowPart({
                ...showPart,
                annonces: true,
                reservations: false,
                creationChambre: false,
              })
            }
            className="btn btn-primary "
            style={{ margin: "1%" }}
          >
            Mes annonces
          </button>
        </div>
      </div>
      {showPart.creationChambre ? (
        <div>
          <NewRoom />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
