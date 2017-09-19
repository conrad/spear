import { actionCreatorVoid, actionCreator } from './helpers';

export const submitSearch = actionCreatorVoid('SUBMIT_SEARCH');
export const unsetPhrase = actionCreator<number>('DELETE_PHRASE');
export const resetFile = actionCreatorVoid('RESET_FILE');
export const setFile = actionCreator<string>('SET_FILE');
export const appendPhrase = actionCreator<string>('APPEND_PHRASE');
export const setAddingPhrase = actionCreator<boolean>('SET_ADDING_PHRASE');

export function addFile(filename: string) {
  return (dispatch: Function, getState: Function) => {
    // const { searchForm } = getState();
    dispatch(setFile(filename));
  }
}

export function addPhrase(phrase: string) {
  return (dispatch: Function, getState: Function) => {
    // const { searchForm } = getState();
    console.log('addphrase in actions');
    dispatch(appendPhrase(phrase));
    dispatch(setAddingPhrase(false));
  }
}

export function deletePhrase(index: number) {
  return (dispatch: Function, getState: Function) => {
    // const { searchForm } = getState();
    dispatch(unsetPhrase(index));
  }
}

export function startAddingPhrase() {
  return (dispatch: Function) => {
    dispatch(setAddingPhrase(true));
  };
}

export function submitValidSearch() {
  return (dispatch: Function, getState: Function) => {
    const { searchForm } = getState();

    if (!searchForm.filename || searchForm.phrases.length < 1) {
      return;
    }

    dispatch(submitSearch());
  };
}
