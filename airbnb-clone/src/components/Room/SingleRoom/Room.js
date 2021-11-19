import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faHome, faUser } from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";

function Room({ room, user }) {
  return (
    <div className="room-block bg-primary rounded ">
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

      <div>
        <h5 className="text-white text-center">Prix : {room.price}$</h5>
      </div>
      <div>
        <div className="">
          <Link
            to={`/rooms/${room.id}`}
            style={{ backgroundColor: "#108ffd" }}
            className="btn col-12 "
          >
            Consulter
          </Link>
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
export default connect(mapStateToProps)(Room);
