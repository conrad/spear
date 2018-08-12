import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import searches from './searches';
import results from "./results";
import menu from "./menu";

const rootReducer = combineReducers({
  menu,
  searches,
  results,
  routing: routing as Reducer<any>
});

export default rootReducer;
