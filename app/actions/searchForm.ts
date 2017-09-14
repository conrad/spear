import { actionCreatorVoid } from './helpers';

export const submitSearch = actionCreatorVoid('SUBMIT_SEARCH');
export const enterFormChar = actionCreatorVoid('ENTER_FORM_CHAR');

export function submitValidSearch() {
  return (dispatch: Function, getState: Function) => {
    const { searchForm } = getState();

    if (!searchForm.filename || searchForm.phrases.length < 1) {
      return;
    }

    dispatch(submitSearch());
  };
}
