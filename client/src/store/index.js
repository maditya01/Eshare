import { createStore, applyMiddleware, compose } from "redux";

//We are importing reducer from reducer index.js folder.
import reducers from "../reducers/index.js";

import thunk from "redux-thunk";
//Second argument in this compose
const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
