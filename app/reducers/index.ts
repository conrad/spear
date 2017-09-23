import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import searchForm, { TState as TSearchFormState } from './searchForm';
import searches, { TState as TSearchesState } from './searches';
import results, { IResult } from "./results";

const rootReducer = combineReducers({
  counter,
  searchForm,
  searches,
  results,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  searchForm: TSearchFormState;
  searches: TSearchesState,
  results: Array<IResult>
  
}

export default rootReducer;
