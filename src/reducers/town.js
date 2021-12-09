import { GET_ALL_TOWNS } from "../actions/towns/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TOWNS:
      return [...initialState, payload];
    default:
      return state;
  }
}
