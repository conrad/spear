import { actionCreator, actionCreatorVoid } from './helpers';
import TextDocWriter from "../local/export/resultsExporter"; 
import * as constants from '../constants'
import IResults from '../types/IResults';

export interface IExcerptIndices {
  resultIndex: number,
  excerptIndex: number,
}

export const saveResults = actionCreator<IResults>('SAVE_RESULTS')
export const toggleShowResultsWindow = actionCreatorVoid(constants.TOGGLE_SHOW_RESULTS_WINDOW)
export const toggleShowResult = actionCreator<number>(constants.TOGGLE_SHOW_RESULT)
export const showOverlay = actionCreator<IExcerptIndices>(constants.SHOW_RESULT_OVERLAY)
export const hideOverlay = actionCreatorVoid(constants.HIDE_RESULT_OVERLAY)
export const exportResults = actionCreatorVoid(constants.EXPORT_RESULTS)

export function setResults(results: IResults) {
  return (dispatch: Function) => {
    dispatch(saveResults(results))
  }
}

export function toggleShowSearchResultRows(index: number) {
  return (dispatch: Function) => {
    dispatch(toggleShowResult(index))
  }
}

export function showResultOverlay(resultIndex: number, excerptIndex: number) {
  return (dispatch: Function) => {
    dispatch(showOverlay({ resultIndex, excerptIndex }))
  }
}

export function hideResultOverlay() {
  return (dispatch: Function) => {
    dispatch(hideOverlay())
  }
}

export function saveResultsToFile() {
  return (dispatch: Function, getState: Function) => {
    const { searches, results } = getState()
    const textDocWriter = new TextDocWriter()
    textDocWriter.saveResults("Spear_Search_Results.txt", searches.searches, results.items)
    dispatch(exportResults())
  }
}
