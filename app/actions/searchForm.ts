import { actionCreatorVoid, actionCreator } from './helpers'
import * as constants from '../constants'
import IPhrase from '../types/IPhrase'

export const submitSearch = actionCreatorVoid(constants.SUBMIT_SEARCH)
export const resetFile = actionCreatorVoid(constants.RESET_FILE)
export const setFile = actionCreator<File>(constants.SET_FILE)
export const setNewPhrase = actionCreator<IPhrase>(constants.SET_NEW_PHRASE)
export const setIsPhraseUsed = actionCreator<boolean>(constants.SET_IS_PHRASE_USED)

export function updateNewPhrase(phrase: IPhrase) {
  return (dispatch: Function) => {
    dispatch(setNewPhrase(phrase));
  }
}

export function updateIsNewPhraseUsed(isUsed: boolean) {
  return (dispatch: Function) => {
    dispatch(setIsPhraseUsed(isUsed));
  }
}

export function addFile(file: File) {
  return (dispatch: Function) => {
    dispatch(setFile(file));
  }
}

export function submitSearchIfValid() {   
  return (dispatch: Function, getState: Function) => {
    const { searchForm } = getState();

    if (!searchForm.filename || searchForm.phrases.length < 1) {
      return;
    }

    dispatch(submitSearch());
  };
}
