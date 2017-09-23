import { actionCreator, actionCreatorVoid } from './helpers';
import { IResult } from "../reducers/results";

export const saveResults = actionCreator<Array<IResult>>('SET_RESULTS');
export const saveResultsInFile = actionCreatorVoid('SAVE_RESULTS_IN_FILE');

export function setResults(results: Array<IResult>) {
  return (dispatch: Function) => {
    dispatch(saveResults(results));
  };
}
