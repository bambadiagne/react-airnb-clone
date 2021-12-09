import {
  GET_ALL_ROOMS,
  RETRIEVE_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  CREATE_ROOM,
} from "../actions/room/types";
const initialState = [];

export default function (rooms = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ROOM:
      return [...rooms, payload];
    case GET_ALL_ROOMS:
      return [...initialState, ...payload];
    case RETRIEVE_ROOM:
      return payload;
    case UPDATE_ROOM:
      return rooms.map((room) => {
        if (room.id === payload.id) {
          return {
            ...room,
            ...payload,
          };
        } else {
          return room;
        }
      });

    case DELETE_ROOM:
      return rooms.filter(({ id }) => id !== payload.id);

    default:
      return initialState;
  }
}
