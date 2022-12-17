import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { initalState, reducers } from "./reducers";
const middleware = [thunk];
const store = createStore(
    reducers,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;