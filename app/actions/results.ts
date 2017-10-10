import { actionCreator, actionCreatorVoid } from './helpers';
import { IResults } from "../reducers/results";

export const saveResults = actionCreator<IResults>('SAVE_RESULTS');
export const toggleShowResult = actionCreator<number>('TOGGLE_SHOW_RESULT');
export const saveResultsToFile = actionCreatorVoid('SAVE_RESULTS_TO_FILE');

export function setResults(results: IResults) {
  return (dispatch: Function) => {
    dispatch(saveResults(results));
  };
}

export function toggleShowSearchResult(index: number) {
  return (dispatch: Function) => {
    dispatch(toggleShowResult(index));
  };
}
