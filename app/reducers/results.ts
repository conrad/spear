import { IAction } from '../actions/helpers';
import { saveResults, saveResultsInFile } from '../actions/results';
import { clone } from '../utils/helpers';

const initialState: IResults = { hasRun: false, items: [] } ; 

export interface IResults {
  hasRun: boolean,
  items: Array<IResult>
}

export interface IResult {
  phrase: string,
  excerpts: Array<IExcerpt>
};

export interface IExcerpt {
  location: string,
  index: number,
  text: string
};

export type TState = Array<IResult>;

export default function results(state: IResults = initialState, action: IAction) {
  let newState: IResults = clone(state);

  if (saveResults.test(action)) {
    newState = action.payload;
    return newState;
  } 
  if (saveResultsInFile.test(action)) {
    console.log("saving results in reducer");
    return newState;
  } 

  return newState;
}  