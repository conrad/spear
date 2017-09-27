import { actionCreator, actionCreatorVoid } from './helpers';
import { IResults } from "../reducers/results";

export const saveResults = actionCreator<IResults>('SET_RESULTS');
export const saveResultsInFile = actionCreatorVoid('SAVE_RESULTS_IN_FILE');

export function setResults(results: IResults) {
  return (dispatch: Function) => {
    dispatch(saveResults(results));
  };
}
