import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faSearch } from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import { GET_ALL_TOWNS } from "../../actions/towns/types";
import { GET_ALL_ROOMS, RETRIEVE_ROOM } from "../../actions/room/types";
import DatePicker from "react-datepicker";
import TownService from "../../services/town/town-service";
import "../../css/searchbar.css";
import RoomService from "../../services/room/room-service";
import Spinner from "../Spinner/Spinner";
function SearchBar({ searchBarDispatch }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ errors: [] });
  const currentDay = new Date();
  const [towns, setTown] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    town: null,
    in_date: "",
    out_date: "",
    minPrice: "",
    maxPrice: null,
    capacity: 0,
  });
  const [firstDate, setFirstDate] = useState(currentDay);
  const [lastDate, setLastDate] = useState(currentDay);
  useEffect(() => {
    TownService.getAllTowns()
      .then((res) => {
        searchBarDispatch({ type: GET_ALL_TOWNS, payload: res });
        setTown(res);
      })
      .catch((err) => {});
  }, []);
  const handleChange = (e) => {
    if (
      e.target.id === "minPrice" ||
      e.target.id === "maxPrice" ||
      e.target.id === "capacity"
    ) {
      setSearchFilter({
        ...searchFilter,
        [e.target.id]: Number(e.target.value),
      });
    } else {
      setSearchFilter({ ...searchFilter, [e.target.id]: e.target.value });
    }
  };
  const validateFilter = (filterData) => {
    const { town } = filterData;
    const errorsFilter = [];
    if (!town) {
      errorsFilter.push("Vous devez spécifier une ville");
    }
    setErrors({ ...errors, errors: errorsFilter });
    return errorsFilter.length === 0;
  };
  const reinitRooms = (e) => {
    e.preventDefault();
    setSearchFilter({
      ...searchFilter,
      town: null,
      in_date: "",
      out_date: "",
      minPrice: "",
      maxPrice: null,
      capacity: 0,
    });
    RoomService.getAllRooms().then((res) => {
      searchBarDispatch({ type: GET_ALL_ROOMS, payload: res });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFilter(searchFilter)) {
      setLoading(true);
      if (lastDate > currentDay) {
        setSearchFilter({
          ...searchFilter,
          out_date: lastDate.toISOString().split("T")[0],
        });
      }

      RoomService.getRoomsbyQuery(searchFilter)
        .then((res) => {
          searchBarDispatch({ type: RETRIEVE_ROOM, payload: res });
        })
        .catch((err) => {
          console.log("err", err);
        });
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };
  return (
    <div className="container box-search bg-primary">
      <ul>
        {errors.errors.map((err) => (
          <li key={err} className="font-weight-bold text-danger">
            {err}
          </li>
        ))}
      </ul>
      <div className="form-search">
        <form>
          <div className="">
            <div className="row">
              <div className="col">
                {" "}
                <label>Ville</label>
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
              <div className="col">
                <label>Personnes</label>

                <input
                  className="form-control"
                  onChange={handleChange}
                  type="number"
                  id="capacity"
                />
              </div>
            </div>
            <div className="row">
              <div className=" col">
                <label>Départ</label>
                <DatePicker
                  selected={firstDate}
                  onChange={(date) => setFirstDate(date)}
                  placeholderText="Depart"
                />
              </div>
              <div className=" col">
                <label>Arrivée</label>
                <DatePicker
                  selected={lastDate}
                  onChange={(date) => setLastDate(date)}
                  placeholderText="Arrivée"
                />
              </div>
            </div>
            <div className="row">
              <div className=" col">
                <label>Prix min</label>
                <input
                  type="number"
                  onChange={handleChange}
                  className="form-control"
                  id="minPrice"
                />
              </div>
              <div className="col">
                <label>Prix max</label>

                <input
                  className="form-control"
                  onChange={handleChange}
                  type="number"
                  id="maxPrice"
                />
              </div>
            </div>
          </div>
          <br />
          <div className="d-flex button-box">
            <button onClick={handleSubmit} className="btn  search-button">
              Rechercher{" "}
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  backgroundColor: "#ff4b5a",
                  color: "#fff",
                  marginLeft: "10px",
                }}
              />
            </button>
            <button
              onClick={reinitRooms}
              style={{ backgroundColor: "green" }}
              className="btn search-button"
            >
              Reinitialiser <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>
          <br />
        </form>
      </div>
      <Spinner loading={loading} />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { searchBarDispatch: (action) => dispatch(action) };
}

export default connect(null, mapDispatchToProps)(SearchBar);
