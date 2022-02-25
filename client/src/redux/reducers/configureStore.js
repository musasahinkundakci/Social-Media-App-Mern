import { applyMiddleware, createStore } from "redux";
import rootreducer from "./index";
import thunk from "redux-thunk";

export function configureStore() {
  return createStore(rootreducer, applyMiddleware(thunk));
}
