import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import searches, { TState as TSearchesState } from './searches';
import results, { TState as TResultsState } from "./results";

const rootReducer = combineReducers({
  searches,
  results,
  routing: routing as Reducer<any>
});

export interface IState {
  searches: TSearchesState,
  results: TResultsState,
}

export default rootReducer;
