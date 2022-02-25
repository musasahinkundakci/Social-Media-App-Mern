import {combineReducers} from "redux";
import postReducer from "./postReducer";
import sessionReducer from "./sessionReducer";
import userReducer from "./userReducer";
import companiesReducer from "./companiesReducer";

export default combineReducers({sessionReducer, companiesReducer, userReducer, postReducer})
;
