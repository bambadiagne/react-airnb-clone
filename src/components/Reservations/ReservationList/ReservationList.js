import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Reservation from "../SingleReservation/Reservation";
import ReservationService from "../../../services/reservations/reservation-service";
import { GET_ALL_RESERVATIONS } from "../../../actions/reservation/types";
import { Redirect } from "react-router";
function ReservationList({ user, reservationAction, allReservations }) {
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.profile === "locateur") {
        ReservationService.getAllReservationsByLandlord(user.id)
          .then((res) => {
            console.log("resland", res);
            reservationAction({ type: GET_ALL_RESERVATIONS, payload: res });
          }, [])
          .catch((err) => {});
      } else {
        ReservationService.getAllReservationsByTenant(user.id)
          .then((res) => {
            console.log("restenant", res);

            reservationAction({ type: GET_ALL_RESERVATIONS, payload: res });
          })
          .catch((err) => {});
      }
    }
  }, []);

  return (
    <div>
      {user ? (
        <div className="container-fluid ">
          <br />
          <br />
          <br />

          <h1 className="text-white text-center">Liste des reservations</h1>
          {allReservations.length > 0 ? (
            <div className="d-flex flex-wrap flex-column flex-md-row ">
              {allReservations.map((reservation) => (
                <Reservation key={reservation.id} reservation={reservation} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Redirect to="/signin" />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    allReservations: state.reservation,
  };
}

function mapDispatchToProps(dispatch) {
  return { reservationAction: (action) => dispatch(action) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList);
