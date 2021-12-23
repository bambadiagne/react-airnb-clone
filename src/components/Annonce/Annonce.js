import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import NewRoom from "../Room/NewRoom/NewRoom";
import RoomService from "../../services/room/room-service";
import { GET_ALL_ROOMS } from "../../actions/room/types";
import SingleAnnonce from "./SingleAnnonce/SingleAnnonce";
import Spinner from "../Spinner/Spinner";
function Annonce({ user, annonceDispatch, rooms }) {
  const [loading, setLoading] = useState(true);
  const [showPart, setShowPart] = useState({
    annonces: false,
    creationChambre: false,
  });
  useEffect(() => {
    if (user) {
      RoomService.getAllRoomsByLandlord(user.id).then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);

        annonceDispatch({ type: GET_ALL_ROOMS, payload: res });
      });
    }
  }, []);
  const showAnnonces = () => {
    if (user) {
      RoomService.getAllRoomsByLandlord(user.id).then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);

        annonceDispatch({ type: GET_ALL_ROOMS, payload: res });
      });
    }

    setShowPart({
      ...showPart,
      annonces: true,
      reservations: false,
      creationChambre: false,
    });
  };
  return (
    <div>
      {user ? (
        <div>
          <br /> <br /> <br />
          <h1 className="text-center text-white">Gestion annonces</h1>
          <div>
            <div className="d-flex mx-auto ">
              <button
                onClick={() =>
                  setShowPart({
                    ...showPart,
                    annonces: false,
                    reservations: false,
                    creationChambre: true,
                  })
                }
                className="btn btn-primary "
                style={{ flexBasis: "30%", flexGrow: 1, flexShrink: 1 }}
              >
                Création chambre
              </button>
              <button
                onClick={showAnnonces}
                className="btn btn-primary "
                style={{ flexBasis: "30%", flexGrow: 1, flexShrink: 1 }}
              >
                Mes annonces
              </button>
            </div>
          </div>
          {showPart.creationChambre ? (
            <div>
              <NewRoom />
            </div>
          ) : (
            ""
          )}
          {showPart.annonces ? (
            <div>
              <div
                hidden={loading}
                className="d-flex flex-wrap flex-column flex-md-row "
              >
                {rooms.map((room) => (
                  <SingleAnnonce key={room.id} room={room} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Redirect to="/signin" />
      )}
      <Spinner loading={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    rooms: state.room,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    annonceDispatch: (action) => dispatch(action),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Annonce);
