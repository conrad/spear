import { IAction } from '../actions/helpers';
import { 
  hideOverlay, 
  saveResults, 
  showOverlay, 
  exportResults, 
  toggleShowResultsWindow, 
  toggleShowResult 
} from '../actions/results';
import { clone } from '../utils/helpers';
import { IResult } from '../types/IResult';
import { IResults } from '../types/IResults';

const initialState: IResults = { 
  hasRun: false, 
  items: [],
  overlay: {
    show: false,
    search: '',
    phrase: '',
    body: '',
  },
  showWindow: true,
}

export type TState = IResults

export default function results(state: IResults = initialState, action: IAction) {
  let newState: IResults = clone(state)

  if (saveResults.test(action)) {
    newState = action.payload
    return newState
  } 

  if (showOverlay.test(action)) {
    const overlayContent: string = newState.items[action.payload.resultIndex].excerpts[action.payload.excerptIndex].pageText
    newState.overlay = {
      show: true,
      search: newState.items[action.payload.resultIndex].search,
      phrase: newState.items[action.payload.resultIndex].phrase,
      body: overlayContent,
    }
    return newState
  }

  if (toggleShowResult.test(action)) {
    if (newState.items[action.payload]) {
      newState.items[action.payload].show = !newState.items[action.payload].show

      return newState
    }

    throw new Error('Attempted to toggle result item to show that doesn\'t exist.')
  }

  if (toggleShowResultsWindow.test(action)) {
    console.log('toggling!:', newState.showWindow)
    newState.showWindow = !newState.showWindow
    return newState
  }

  if (hideOverlay.test(action)) {
    newState.overlay.show = false
    return newState
  }

  if (exportResults.test(action)) {
    return newState
  } 

  return newState
}
