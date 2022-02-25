import initialState from "./initialState";
import * as userActions from "../actions/actionTypes"

const companiesReducer = (state = initialState.posts, action) => {
    switch (action.type) {
        case userActions.GET_COMPANIES_SUCCESS:
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}
export default companiesReducer