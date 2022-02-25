import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.session, action) {
    switch (action.type) {
        case actionTypes.GET_USER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
