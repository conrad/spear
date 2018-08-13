import { combineReducers } from 'redux';
import searches from './searches';
import results from "./results";
import menu from "./menu";

const rootReducer = combineReducers({
  menu,
  searches,
  results
});

export default rootReducer;
