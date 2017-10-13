import { actionCreatorVoid, actionCreator } from './helpers';

export const submitSearch = actionCreatorVoid('SUBMIT_SEARCH');
export const resetFile = actionCreatorVoid('RESET_FILE');
export const setFile = actionCreator<File>('SET_FILE');
export const setNewPhrase = actionCreator<string>('SET_NEW_PHRASE');
export const setIsPhraseUsed = actionCreator<boolean>('SET_IS_PHRASE_USED');
export const setCategory = actionCreator<string>('SET_CATEGORY');

export function updateNewPhrase(text: string) {
  return (dispatch: Function) => {
    dispatch(setNewPhrase(text));
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

export function updateCategory(category: string) {
  return (dispatch: Function) => {
    dispatch(setCategory(category));
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
