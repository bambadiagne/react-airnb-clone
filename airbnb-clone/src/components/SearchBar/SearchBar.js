import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import { GET_ALL_TOWNS } from "../../actions/towns/types";
import { RETRIEVE_ROOM } from "../../actions/room/types";
import DatePicker from "react-datepicker";
import TownService from "../../services/town/town-service";
import "../../css/searchbar.css";
import RoomService from "../../services/room/room-service";
function SearchBar({ searchBarDispatch }) {
  const parseStringToDate = (date) => {
    const tabDate = date.split("-").map((elt) => Number(elt));
    return new Date(...tabDate);
  };
  const [errors, setErrors] = useState({ errors: [] });

  const [towns, setTown] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    town: null,
    in_date: new Date().toISOString().split("T")[0],
    out_date: new Date().toISOString().split("T")[0],
    minPrice: 1,
    maxPrice: null,
    capacity: 0,
  });
  const [firstDate, setFirstDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());

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
    const { town, minPrice, maxPrice, capacity } = filterData;
    const errorsFilter = [];
    if (!town) {
      errorsFilter.push("Vous devez spécifier une ville");
    }
    setErrors({ ...errors, errors: errorsFilter });
    return errorsFilter.length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFilter(searchFilter)) {
      setSearchFilter({
        ...searchFilter,
        in_date: firstDate.toISOString().split("T")[0],
        out_date: lastDate.toISOString().split("T")[0],
      });
      console.log("OK");
      RoomService.getRoomsbyQuery(searchFilter)
        .then((res) => {
          console.log("====================================");
          console.log("Chambres dispo", res);
          console.log("====================================");
          searchBarDispatch({ type: RETRIEVE_ROOM, payload: res });
        })
        .catch((err) => {
          console.log("err", err);
        });
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
      <div onSubmit={handleSubmit} className="form-search">
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
                <label>Nombre de personnes</label>

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
            <button className="btn  search-button">
              {" "}
              Rechercher{" "}
              <FontAwesomeIcon
                icon={faSearch}
                style={{ backgroundColor: "#ff4b5a", color: "#fff" }}
              />
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { searchBarDispatch: (action) => dispatch(action) };
}

export default connect(null, mapDispatchToProps)(SearchBar);
