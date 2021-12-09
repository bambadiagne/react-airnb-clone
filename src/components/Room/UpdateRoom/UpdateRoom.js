import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHome,
  faPlusCircle,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import RoomService from "../../../services/room/room-service";
import TownService from "../../../services/town/town-service";
import { GET_ALL_TOWNS } from "../../../actions/towns/types";
import {
  RETRIEVE_ROOM,
  CREATE_ROOM,
  UPDATE_ROOM,
} from "../../../actions/room/types";
import { useParams } from "react-router";
function UpdateRoom({ roomDispatch, user }) {
  const { id } = useParams();
  const [room, setRoom] = useState({
    town: "",
    capacity: "",
    price: "",
  });
  useEffect(() => {
    TownService.getAllTowns()
      .then((res) => {
        roomDispatch({ type: GET_ALL_TOWNS, payload: res });
        setTown(res);
      })
      .catch((err) => {});
    RoomService.getSingleRoom(id)
      .then((res) => {
        setRoom(res);
        roomDispatch({ type: RETRIEVE_ROOM, payload: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [towns, setTown] = useState([]);

  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState({ errors: [] });
  const handleChange = (e) => {
    if (e.target.id === "price" || e.target.id === "capacity") {
      setRoom({ ...room, [e.target.id]: Number(e.target.value) });
    } else {
      setRoom({ ...room, [e.target.id]: e.target.value });
    }
  };

  function validateTownData(newTown) {
    const errorsForm = [];
    const { capacity, price, town } = newTown;
    if (!capacity) {
      errorsForm.push("Veuillez preciser la capacité");
    } else if (Number(capacity) < 0) {
      errorsForm.push("Capacité negative");
    }
    if (!price) {
      errorsForm.push("Veuillez preciser un prix");
    }
    if (!town) {
      errorsForm.push("Veuillez preciser une ville");
    }
    setErrors({ ...errors, errors: errorsForm });
    return errorsForm.length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { capacity, price, town } = room;

    if (validateTownData(room)) {
      setRoom({
        ...room,
        capacity: Number(capacity),
        price: Number(price),
      });

      RoomService.UpdateSingleRoom(room.id, room)
        .then((res) => {
          setSuccessful(true);
          roomDispatch({ type: UPDATE_ROOM, payload: room });
        })
        .catch((err) => {
          console.log("err", err);
          setErrors({ ...errors, err });
        });
    }
  };

  return (
    <div className="signup-form ">
      <form onSubmit={handleSubmit}>
        <br />
        <ul>
          {errors.errors.map((err) => (
            <li key={err} className="text-danger">
              {err}
            </li>
          ))}
        </ul>
        <div
          hidden={!successful}
          className="alert alert-success justify-content-center"
          role="alert"
        >
          Modification réussie !
        </div>

        <h2>Modifier chambre</h2>
        <label>Ville</label>

        <div className="form-group input-container">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <select
            id="town"
            onChange={handleChange}
            className="form-select"
            aria-label="Choisissez une ville"
            defaultValue={room.town}
          >
            <option>{room.town}</option>
            {towns.map((town) => (
              <option key={town.name} value={town.name}>
                {town.name}
              </option>
            ))}
          </select>
        </div>

        <label>Capacité</label>
        <div className="form-group input-container">
          <FontAwesomeIcon icon={faUser} className="icon" />

          <input
            type="number"
            id="capacity"
            onChange={handleChange}
            className="form-control input-field"
            name="capacity"
            placeholder={room.capacity}
          />
        </div>
        <br />
        <label>Prix</label>

        <div className="form-group input-container">
          <FontAwesomeIcon icon={faDollarSign} size="2x" className="icon" />

          <input
            type="number"
            id="price"
            onChange={handleChange}
            className="form-control input-field"
            name="price"
            placeholder={room.price}
          />
        </div>
        <br />

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary col-12 btn-lg btn-block"
          >
            Ajouter <FontAwesomeIcon key={"plane2"} icon={faPlusCircle} />
          </button>
        </div>
      </form>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return { roomDispatch: (action) => dispatch(action) };
}
function mapStateToProps(state) {
  return { user: state.auth.user };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoom);
