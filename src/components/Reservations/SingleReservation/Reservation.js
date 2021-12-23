import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPaperPlane,
  faUserClock,
  faSignOutAlt,
} from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import RoomService from "../../../services/room/room-service";
import TenantService from "../../../services/tenant/tenant-service";
import "../../../css/reservation.css";
import { RETRIEVE_ROOM } from "../../../actions/room/types";
import DatePicker from "react-datepicker";

import {
  UPDATE_RESERVATION,
  DELETE_RESERVATION,
} from "../../../actions/reservation/types";
import ReservationService from "../../../services/reservations/reservation-service";
import Spinner from "../../Spinner/Spinner";
function Reservation({ reservationDispatch, reservation, user }) {
  const [loading, setLoading] = useState(false);

  const parseStringToDate = (date) => {
    const tabDate = date.split("-").map((elt) => Number(elt));
    return new Date(...tabDate);
  };

  const [cancelSuccess, setCancelSuccess] = useState({
    cancel: false,
    modify: false,
    showModify: false,
  });
  const [room, setRoom] = useState(null);
  const [tenantUser, setTenant] = useState(null);
  const [firstDate, setFirstDate] = useState(
    parseStringToDate(reservation.in_date)
  );
  const [lastDate, setLastDate] = useState(
    parseStringToDate(reservation.out_date)
  );
  const [errors, setErrors] = useState({ errors: [] });
  const [modifyCapacity, setModifyReservation] = useState(null);

  function validateuserData() {
    const errorsForm = [];
    if (!modifyCapacity) {
      errorsForm.push("La capacité est obligatoire");
    } else if (modifyCapacity > room.capacity) {
      errorsForm.push("Nombre de places superieur à la capacité");
    }
    if (!firstDate) {
      errorsForm.push("Le depart est obligatoire");
    }
    if (!lastDate) {
      errorsForm.push("L'arrivée est obligatoire");
    }
    setErrors({ ...errors, errors: errorsForm });
    return errorsForm.length === 0;
  }
  useEffect(() => {
    RoomService.getSingleRoom(reservation.room).then((res) => {
      setRoom(res);
    });
    TenantService.getSingleTenant(reservation.tenant).then((res) => {
      setTenant(res);
    });
  }, []);

  const cancelReservation = () => {
    if (window.confirm("Voulez vous vraiment annuler cette reservation")) {
      setLoading(true);
      ReservationService.deleteSingleReservation(reservation.id)
        .then((res) => {
          setTimeout(() => {
            setLoading(false);
            setCancelSuccess({ ...cancelSuccess, cancel: true });
            reservationDispatch({
              type: DELETE_RESERVATION,
              payload: reservation,
            });
            window.location = "/reservations";
          }, 1500);
        })
        .catch((err) => {});
    }
  };
  const showReservation = () => {
    setCancelSuccess({
      ...cancelSuccess,
      showModify: !cancelSuccess.showModify,
    });
  };
  const confirmerReservation = (e) => {
    e.preventDefault();
    if (window.confirm("Voulez-vous confirmer la reservation")) {
      ReservationService.UpdateSingleReservation(reservation.id, {
        ...reservation,
        status: "A",
      }).then((res) => {
        setTimeout(() => {
          setLoading(false);
          setCancelSuccess({
            ...cancelSuccess,
            showModify: false,
            modify: true,
          });
        }, 1500);

        reservation.status = "P";
      });
    }
  };
  const modifyReservation = (e) => {
    e.preventDefault();
    if (validateuserData()) {
      ReservationService.UpdateSingleReservation(reservation.id, {
        ...reservation,
        nbr_persons: modifyCapacity,
        in_date: firstDate.toISOString().split("T")[0],
        out_date: lastDate.toISOString().split("T")[0],
      })
        .then((res) => {
          setTimeout(() => {
            setCancelSuccess({ ...cancelSuccess, modify: true });
            setLoading(false);
          }, 1500);
          reservation = {
            ...reservation,
            nbr_persons: modifyCapacity,
            in_date: firstDate.toISOString().split("T")[0],
            out_date: lastDate.toISOString().split("T")[0],
          };
          window.location = "/reservations";
        })
        .catch((err) => {});
    }
  };

  return (
    <div className="room-block bg-primary rounded ">
      <ul>
        {errors.errors.map((err) => (
          <li key={err} className="text-light">
            {err}
          </li>
        ))}
      </ul>
      <div
        hidden={!cancelSuccess.cancel}
        className="alert alert-success justify-content-center"
        role="alert"
      >
        Annulation réussie !
      </div>
      <div
        hidden={!cancelSuccess.modify}
        className="alert alert-success justify-content-center"
        role="alert"
      >
        Modification réussie !
      </div>

      <div className="d-flex">
        <FontAwesomeIcon icon={faHome} className="icon flex-row bg-primary" />
        {room ? <h4 className="text-center m-10 ">{room.town}</h4> : ""}
      </div>
      <div>
        <h5 className="text-center text-white ">
          <FontAwesomeIcon icon={faUser} className=" flex-row bg-primary" />{" "}
          Capacité reservée : {reservation.nbr_persons}
        </h5>
      </div>
      <div className="row">
        <div className="col">
          <h5 className="text-center text-white ">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className=" flex-row bg-primary"
            />
            Début <br /> {reservation.in_date}
          </h5>
        </div>
        <div className="col">
          <h5 className="text-center text-white ">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className=" flex-row bg-primary"
            />
            Fin <br /> {reservation.out_date}
          </h5>
        </div>
      </div>

      <div>
        <h5 className="text-white text-center">
          Prix : {reservation.total_price}$
        </h5>
      </div>
      <div>
        {reservation.status === "A" ? (
          <h5 className="text-center text-white ">
            Statut : <span className="badge alert-success">Active</span>
          </h5>
        ) : (
          ""
        )}
        {reservation.status === "P" ? (
          <h5 className="text-center text-white ">
            Statut :
            <span className="text-center badge alert-warning">En attente</span>
          </h5>
        ) : (
          ""
        )}
        {reservation.status === "E" ? (
          <h5 className="text-center text-white ">
            Statut :
            <span className="text-center badge alert-danger">Expirée</span>
          </h5>
        ) : (
          ""
        )}
      </div>

      <div>
        {user.profile !== "locateur" ? (
          <div className="d-flex flex-row">
            <button
              onClick={cancelReservation}
              className="btn col-6 mr-2  btn-flex btn-danger"
            >
              Annuler
            </button>
            <button
              onClick={showReservation}
              className="btn col-6 ml-2 btn-flex col-5  btn-warning"
              disabled={reservation.status === "A"}
            >
              Modifier
            </button>
          </div>
        ) : (
          ""
        )}
        {user.profile === "locateur" ? (
          <div className="d-flex flex-row">
            <button
              onClick={confirmerReservation}
              className="btn col-12 btn-lg btn-flex btn-success"
            >
              Confirmer
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {user.profile === "locataire" ? (
        <div hidden={!cancelSuccess.showModify} className="bg-white rounded">
          <form onSubmit={modifyReservation}>
            <div className="form-group">
              <label>
                <FontAwesomeIcon
                  icon={faUser}
                  className=" flex-row bg-primary"
                />
                Capacité
              </label>
              <input
                className="form-control"
                onChange={(e) => setModifyReservation(e.target.value)}
                id="capacity"
                type="number"
              />
            </div>
            <div className="form-group ">
              <FontAwesomeIcon icon={faUserClock} className="icon" />
              <DatePicker
                selected={firstDate}
                onChange={(date) => setFirstDate(date)}
                isClearable
                placeholderText="I have been cleared!"
              />{" "}
            </div>
            <div className="form-group ">
              <FontAwesomeIcon icon={faUserClock} className="icon" />
              <DatePicker
                selected={lastDate}
                onChange={(date) => setLastDate(date)}
                isClearable
                placeholderText="I have been cleared!"
              />{" "}
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
                Modifier
                <FontAwesomeIcon
                  key={"plane2"}
                  icon={faPaperPlane}
                  style={{ float: "right" }}
                />
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      <Spinner loading={loading} />
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
    reservationDispatch: (action) => dispatch(action),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
