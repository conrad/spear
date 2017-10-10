import { IAction } from '../actions/helpers';
import { saveResults, saveResultsToFile, toggleShowResult } from '../actions/results';
import { clone } from '../utils/helpers';

const initialState: IResults = { hasRun: false, items: [] }; 

export interface IResults {
  hasRun: boolean,
  items: Array<IResult>,
}

export interface IResult {
  search: string,
  phrase: string,
  excerpts: Array<IExcerpt>,
  show: boolean
};

export interface IExcerpt {
  location: string,
  index: number,
  text: string,
  pageText: string,
};

export type TState = IResults;

export default function results(state: IResults = initialState, action: IAction) {
  let newState: IResults = clone(state);

  if (saveResults.test(action)) {
    newState = action.payload;
    return newState;
  } 

  if (toggleShowResult.test(action)) {
    newState.items[action.payload].show = !newState.items[action.payload].show;
    return newState;
  }

  if (saveResultsToFile.test(action)) {
    return newState;
  } 

  return newState;
}  