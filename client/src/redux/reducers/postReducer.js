import * as actions from "../actions/actionTypes";

import initialState from "./initialState";
export default function postReducer(state = initialState.posts, action) {
  switch (action.type) {
    case actions.GET_POSTS_SUCCESS: {
      return action.payload;
    }
    case actions.GET_POSTS_BY_ID_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
