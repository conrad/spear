import { IAction } from '../actions/helpers';
import { hideOverlay, saveResults, showOverlay, exportResults, toggleShowResult } from '../actions/results';
import { clone } from '../utils/helpers';

const initialState: IResults = { 
  hasRun: false, 
  items: [],
  overlay: {
    show: false,
    search: '',
    phrase: '',
    body: '',
  }
}; 

export interface IResults {
  hasRun: boolean,
  items: Array<IResult>,
  overlay: {
    show: boolean,
    search: string,
    phrase: string,
    body: string,
  }
};

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

  if (showOverlay.test(action)) {
    const overlayContent: string = newState.items[action.payload.resultIndex].excerpts[action.payload.excerptIndex].pageText;
    newState.overlay = {
      show: true,
      search: newState.items[action.payload.resultIndex].search,
      phrase: newState.items[action.payload.resultIndex].phrase,
      body: overlayContent,
    }
    return newState;
  }

  if (toggleShowResult.test(action)) {
    newState.items[action.payload].show = !newState.items[action.payload].show;
    return newState;
  }

  if (hideOverlay.test(action)) {
    newState.overlay.show = false;
    return newState;
  }

  if (exportResults.test(action)) {
    return newState;
  } 

  return newState;
}
