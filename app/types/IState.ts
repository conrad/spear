import { TState as TSearchesState } from './../reducers/searches';
import { TState as TResultsState } from "./../reducers/results";
import { TState as TMenuState } from "./../reducers/menu";

export default interface IState {
  type: '???',
  menu: TMenuState,
  searches: TSearchesState,
  results: TResultsState,
}
