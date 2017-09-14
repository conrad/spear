import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import searchForm, { TState as TSearchFormState } from './searchForm';

const rootReducer = combineReducers({
  counter,
  searchForm,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  searchForm: TSearchFormState;
}

export default rootReducer;
