import { createStore, combineReducers } from "redux";
import yourReducer from "./reducer/reducer"; // Import your reducer(s)

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  // Define your reducers here
  yourReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
