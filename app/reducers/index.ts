import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import searches, { TState as TSearchesState } from './searches';
import results, { TState as TResultsState } from "./results";
import menu, { TState as TMenuState } from "./menu";

const rootReducer = combineReducers({
  menu,
  searches,
  results,
  routing: routing as Reducer<any>
});

export interface IState {
  menu: TMenuState,
  searches: TSearchesState,
  results: TResultsState,
}

export default rootReducer;
