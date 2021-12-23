import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { RETRIEVE_ROOM } from "../../../actions/room/types";
import RoomService from "../../../services/room/room-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import {
  faDollarSign,
  faHome,
  faPlusCircle,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import "../../../css/reservation.css";
import ReservationService from "../../../services/reservations/reservation-service";
import Spinner from "../../Spinner/Spinner";
function RoomPage({ roomDispatch, user }) {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState({});
  const { id } = useParams();

  const [changeReservation, setChangeReservation] = useState({
    showForm: false,
    reservationCreated: false,
  });
  const isAuth = user ? true : false;
  const [errors, setErrors] = useState({ errors: [] });
  const currentDay = new Date();
  const [firstDate, setFirstDate] = useState(currentDay);
  const [lastDate, setLastDate] = useState(currentDay);

  const [reservation, setReservation] = useState({
    room: "",
    tenant: 0,
    landlord: 0,
    nbr_persons: 0,
    in_date: "",
    out_date: "",
    total_price: 0,
    status: "P",
  });
  useEffect(() => {
    RoomService.getSingleRoom(id)
      .then((res) => {
        setRoom(res);
        setLoading(false);

        setReservation({
          ...reservation,
          room: res.id,
          landlord: res.landlord,
          tenant: user.id,
        });
        roomDispatch({ type: RETRIEVE_ROOM, payload: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const validateData = (reservationData) => {
    const errorsForm = [];
    if (Number(reservationData.nbr_persons) <= 0) {
      errorsForm.push("Le nombre doit etre superieur à 0");
    }
    if (lastDate < currentDay) {
      errorsForm.push("La date de fin ne peut pas etre aujourdh'ui");
    }
    if (Number(reservationData.nbr_persons) > room.capacity) {
      errorsForm.push("Vous avez depassé la capacité de la chambre");
    }
    if (
      firstDate <
      new Date(
        "" +
          firstDate.getFullYear() +
          "-" +
          firstDate.getMonth() +
          "-" +
          firstDate.getDate()
      )
    ) {
      errorsForm.push(
        "La reservation ne peut pas se faire à une date anterieure"
      );
    }
    if (firstDate > lastDate) {
      errorsForm.push("La date de fin doit etre superieur à la date de début");
    }
    setErrors({ ...errors, errors: errorsForm });
    return errorsForm.length === 0;
  };

  const handleChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateData(reservation)) {
      ReservationService.createNewReservation({
        ...reservation,
        nbr_persons: Number(reservation.nbr_persons),
        total_price: reservation.nbr_persons * room.price,
        in_date: firstDate.toISOString().split("T")[0],
        out_date: lastDate.toISOString().split("T")[0],
      })
        .then((res) => {
          setChangeReservation({
            ...changeReservation,
            reservationCreated: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <div
        hidden={!changeReservation.reservationCreated}
        className="alert alert-success justify-content-center"
        role="alert"
      >
        Réservation soumis avec succès !
      </div>
      <div style={{ backgroundColor: "#516BEB" }} className="rounded">
        <h1 className="text-center">Détails de la chambre</h1>
        <h2 className="text-center">Localité : {room.town}</h2>
        <h2 className="text-center">Capacité : {room.capacity}</h2>
        <h2 className="text-center">Prix : {room.price}$</h2>
        <div
          style={{
            backgroundColor: "#516BEB",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#516BEB",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <button
              disabled={!isAuth}
              style={{
                width: "80%",
              }}
              onClick={() =>
                setChangeReservation({
                  ...changeReservation,
                  showForm: !changeReservation.showForm,
                })
              }
              className="btn btn-lg btn-light"
            >
              Réserver
            </button>
            <div hidden={isAuth} className="row">
              <span className="text-center text-light">
                Connectez-vous pour réserver
              </span>
            </div>
          </div>
          <br />
          <br />
          <br />
          {isAuth ? (
            <div hidden={!changeReservation.showForm}>
              <form onSubmit={handleSubmit} className="bg-white rounded">
                <br />
                <ul>
                  {errors.errors.map((err) => (
                    <li key={err} className="text-danger">
                      {err}
                    </li>
                  ))}
                </ul>

                <h2 className="text-center">Nouvelle reservation</h2>

                <label
                  style={{
                    color: "#636363",
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Nombre de places
                </label>
                <div
                  style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="form-group input-container"
                >
                  <FontAwesomeIcon icon={faUser} className="icon" />

                  <input
                    type="number"
                    id="nbr_persons"
                    onChange={handleChange}
                    className="form-control input-field"
                    name="nbr_persons"
                    placeholder="0"
                  />
                </div>
                <div
                  style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="d-flex flex-wrap flex-column flex-md-row"
                >
                  <div className=" col">
                    <label style={{ color: "#636363" }}>Départ</label>
                    <DatePicker
                      selected={firstDate}
                      onChange={(date) => setFirstDate(date)}
                      placeholderText="Depart"
                    />
                  </div>
                  <div className=" col">
                    <label style={{ color: "#636363" }}>Arrivée</label>
                    <DatePicker
                      selected={lastDate}
                      onChange={(date) => setLastDate(date)}
                      placeholderText="Arrivée"
                    />
                  </div>
                </div>

                <br />

                <div className="form-group ">
                  <button
                    type="submit"
                    className="col-12 btn btn-primary btn-lg btn-block"
                  >
                    Reserver{" "}
                    <FontAwesomeIcon key={"circle"} icon={faPlusCircle} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          <br />
        </div>
      </div>
      <Spinner loading={loading} />
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    roomDispatch: (action) => dispatch(action),
  };
}
function mapStateToProps(state) {
  return { user: state.auth.user };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
