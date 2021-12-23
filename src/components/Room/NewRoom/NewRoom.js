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
import { CREATE_ROOM } from "../../../actions/room/types";
import Spinner from "../../Spinner/Spinner";
function NewRoom({ roomDispatch, user }) {
  const [loading, setLoading] = useState(false);
  const [towns, setTown] = useState([]);
  useEffect(() => {
    TownService.getAllTowns()
      .then((res) => {
        roomDispatch({ type: GET_ALL_TOWNS, payload: res });
        setTown(res);
      })
      .catch((err) => {});
  }, []);

  const townData = {
    landlord: user.id,
    capacity: null,
    price: null,
    town: null,
  };
  const [successful, setSuccessful] = useState(false);
  const [newTownData, setnewTownData] = useState(townData);
  const [errors, setErrors] = useState({ errors: [] });
  const handleChange = (e) => {
    if (e.target.id === "price" || e.target.id === "capacity") {
      setnewTownData({ ...newTownData, [e.target.id]: Number(e.target.value) });
    } else {
      setnewTownData({ ...newTownData, [e.target.id]: e.target.value });
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
    const { capacity, price, town } = newTownData;

    if (validateTownData(newTownData)) {
      setLoading(true);
      setnewTownData({
        ...townData,
        capacity: Number(capacity),
        price: Number(price),
      });

      RoomService.createNewRoom(newTownData)
        .then((res) => {
          setTimeout(() => {
            setLoading(false);
            setSuccessful(true);
          }, 1500);

          roomDispatch({ type: CREATE_ROOM, payload: newTownData });
        })
        .catch((err) => {
          console.log("err", err);
          setErrors({ ...errors, err });
        });
      setTimeout(() => {
        setLoading(false);
      }, 1500);
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
          Creation réussie !
        </div>

        <h2>Nouvelle chambre</h2>
        <label className="text-dark">Ville</label>

        <div className="form-group input-container">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <select
            id="town"
            onChange={handleChange}
            className="form-select"
            aria-label="Choisissez une ville"
          >
            <option defaultValue>Choisissez une ville</option>
            {towns.map((town) => (
              <option key={town.name} value={town.name}>
                {town.name}
              </option>
            ))}
          </select>
        </div>

        <label className="text-dark">Capacité</label>
        <div className="form-group input-container">
          <FontAwesomeIcon icon={faUser} className="icon" />

          <input
            type="number"
            id="capacity"
            onChange={handleChange}
            className="form-control input-field"
            name="capacity"
            placeholder="0"
          />
        </div>
        <br />
        <label className="text-dark">Prix</label>

        <div className="form-group input-container">
          <FontAwesomeIcon icon={faDollarSign} size="2x" className="icon" />

          <input
            type="number"
            id="price"
            onChange={handleChange}
            className="form-control input-field"
            name="price"
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
      <Spinner loading={loading} />
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return { roomDispatch: (action) => dispatch(action) };
}
function mapStateToProps(state) {
  return { user: state.auth.user };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRoom);
