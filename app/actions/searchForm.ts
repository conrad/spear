import { actionCreatorVoid, actionCreator } from './helpers';

export const submitSearch = actionCreatorVoid('SUBMIT_SEARCH');
export const unsetPhrase = actionCreator<number>('DELETE_PHRASE');
export const resetFile = actionCreatorVoid('RESET_FILE');
export const setFile = actionCreator<string>('SET_FILE');
export const appendPhrase = actionCreator<string>('APPEND_PHRASE');
export const setNewPhrase = actionCreator<string>('SET_NEW_PHRASE');
export const setIsPhraseUsed = actionCreator<boolean>('SET_IS_PHRASE_USED');

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

export function addFile(filename: string) {
  return (dispatch: Function) => {
    // const { searchForm } = getState();
    dispatch(setFile(filename));
  }
}

export function addPhrase(phrase: string) {
  return (dispatch: Function) => {
    dispatch(appendPhrase(phrase));
  }
}

export function deletePhrase(index: number) {
  return (dispatch: Function) => {
    dispatch(unsetPhrase(index));
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
