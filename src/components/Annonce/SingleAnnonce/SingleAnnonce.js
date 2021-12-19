import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHome,
  faUser,
  faSignOutAlt,
} from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import ReservationService from "../../../services/reservations/reservation-service";
import RoomService from "../../../services/room/room-service";

function Room({ room, user, annonceDispatch }) {
  const [cancelSuccess, setCancelSuccess] = useState({
    delete: false,
    reduceRoom: false,
  });

  const deleteAnnonce = () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette annonce")) {
      const foundReservations = ReservationService.getSingleReservationByRoom({
        userId: user.id,
        roomId: room.id,
      });
      foundReservations.forEach((reservation) => {
        ReservationService.deleteSingleReservation(reservation.id)
          .then((res) => {
            console.log("reservation supprimée", reservation);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      RoomService.deleteSingleRoom(room.id)
        .then((res) => {
          setCancelSuccess({ ...cancelSuccess, delete: true });
          setTimeout(() => {
            setCancelSuccess({ ...cancelSuccess, reduceRoom: true });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div
      hidden={cancelSuccess.reduceRoom}
      className="room-block bg-primary rounded "
    >
      <div
        hidden={!cancelSuccess.delete}
        className="alert alert-success justify-content-center"
        role="alert"
      >
        Suppression réussie !
      </div>

      <div className="d-flex">
        <FontAwesomeIcon icon={faHome} className="icon flex-row bg-primary" />
        <h4 className="text-center m-10 "> {room.town}</h4>
      </div>
      <div>
        <h5 className="text-center text-white ">
          <FontAwesomeIcon icon={faUser} className=" flex-row bg-primary" />
          Capacité : {room.capacity}
        </h5>
      </div>
      <div className="row">
        <div>
          {" "}
          <h5 className="text-center text-white ">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className=" flex-row bg-primary"
            />
            Capacité : {room.capacity}
          </h5>
        </div>
      </div>

      <div>
        <h5 className="text-white text-center">Prix : {room.price}$</h5>
      </div>
      <div>
        <div className="d-flex flex-row">
          <Link
            to={`/room/update/${room.id}`}
            className="btn col-6 ml-2 btn-flex   btn-warning"
          >
            Modifier
          </Link>

          <button
            onClick={deleteAnnonce}
            className="btn col-6 ml-2 btn-flex   btn-danger"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    annonceDispatch: (action) => dispatch(action),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Room);
