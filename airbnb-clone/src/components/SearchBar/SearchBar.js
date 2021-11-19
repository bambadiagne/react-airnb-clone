import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faLock,
  faUserClock,
  faUser,
  faBriefcase,
} from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import { GET_ALL_TOWNS } from "../../actions/towns/types";
import DatePicker from "react-datepicker";

import TownService from "../../services/town/town-service";
import "../../css/searchbar.css";
function SearchBar({ searchBarDispatch }) {
  const parseStringToDate = (date) => {
    const tabDate = date.split("-").map((elt) => Number(elt));
    return new Date(...tabDate);
  };
  const [towns, setTown] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    town: null,
    in_date: null,
    out_date: null,
    price: null,
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
    if (e.target.id === "price" || e.target.id === "capacity") {
      setSearchFilter({
        ...searchFilter,
        [e.target.id]: Number(e.target.value),
      });
    } else {
      setSearchFilter({ ...searchFilter, [e.target.id]: e.target.value });
    }
  };
  return (
    <div className="container search-bar">
      <div className="form-search">
        {" "}
        <form>
          <div className="d-flex ">
            <div className=" box-search">
              {" "}
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
            <div className=" box-search">
              {" "}
              <DatePicker
                selected={firstDate}
                onChange={(date) => setFirstDate(date)}
                isClearable
                placeholderText="Depart"
              />
            </div>
            <div className=" box-search">
              {" "}
              <DatePicker
                selected={lastDate}
                onChange={(date) => setLastDate(date)}
                isClearable
                placeholderText="Arrivée"
              />
            </div>
            <div className=" box-search">
              <input
                type="number"
                className="form-control"
                placeholder="prix min"
              />
            </div>
            <div className=" box-search">
              <input
                type="number"
                className="form-control"
                placeholder="prix max"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { searchBarDispatch: (action) => dispatch(action) };
}

export default connect(null, mapDispatchToProps)(SearchBar);
