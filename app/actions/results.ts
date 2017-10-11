import { actionCreator, actionCreatorVoid } from './helpers';
import { IResults } from "../reducers/results";
import TextDocWriter from "../local/resultsExporter"; 

export const saveResults = actionCreator<IResults>('SAVE_RESULTS');
export const toggleShowResult = actionCreator<number>('TOGGLE_SHOW_RESULT');
export const exportResults = actionCreatorVoid('EXPORT_RESULTS');

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

export function saveResultsToFile() {
  return (dispatch: Function, getState: Function) => {
    const { searches, results } = getState();
    const textDocWriter = new TextDocWriter();
    textDocWriter.saveResults("Spear_Search_Results.txt", searches.searches, results.items);
    dispatch(exportResults());
  };
}
