import { IAction } from '../actions/helpers';
import { submitSearch, appendPhrase, unsetPhrase, setFile, resetFile } from '../actions/searchForm';


const initialState = { 
  filename: "",
  phrases: ['hey ma', 'whats up']   
};

export interface IFormState {
  filename: string
  phrases: Array<string>
};

export type TState = IFormState;

export default function searchForm(state: IFormState = initialState, action: IAction) {
  if (appendPhrase.test(action)) {
    state.phrases.push(action.payload);
    return state;
  } else if (unsetPhrase.test(action)) {
    state.phrases.splice(action.payload, 1);
    return state;
  } else if (setFile.test(action)) {
    state.filename = action.payload;
    return state;
  } else if (resetFile.test(action)) {
    state.filename = '';
    return state;
  } else if (submitSearch.test(action)) {
    console.log("filename:", state.filename);
    console.log("first phrase:", state.phrases[0]);
    return state;
  }

  return state;
}
