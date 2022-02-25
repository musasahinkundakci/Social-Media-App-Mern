import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case actionTypes.GET_SESSION_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
