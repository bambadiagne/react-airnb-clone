import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RoomService from "../../../services/room/room-service";
import { GET_ALL_ROOMS } from "../../../actions/room/types";
import Room from "../SingleRoom/Room";
import SearchBar from "../../SearchBar/SearchBar";
function RoomList({ roomDispatch, rooms }) {
  useEffect(() => {
    RoomService.getAllRooms()
      .then((res) => {
        roomDispatch({
          type: GET_ALL_ROOMS,
          payload: res,
        });
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="container-fluid home">
      <h1 className="text-white text-center">Liste des chambres</h1>
      <br />
      <SearchBar />
      <br />
      <br />
      <br />

      {rooms.length > 0 ? (
        <div className="d-flex flex-wrap flex-column flex-md-row ">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      ) : (
        0
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    rooms: state.room,
  };
}
function mapDispatchToProps(dispatch) {
  return { roomDispatch: (action) => dispatch(action) };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
