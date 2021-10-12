import { createStore } from "redux";

import groceryReducer from "../Reducers/groceryReducer";

const store = createStore(groceryReducer);

export default store;
