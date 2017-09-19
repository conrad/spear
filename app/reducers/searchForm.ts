import { IAction } from '../actions/helpers';
import { submitSearch, appendPhrase, unsetPhrase, setFile, resetFile } from '../actions/searchForm';
import { clone } from './helpers';


const initialState = { 
  filename: "",
  phrases: ['hey ma', 'whats up']   
};

export interface IFormState {
  filename: string,
  phrases: Array<string>
};

export type TState = IFormState;

export default function searchForm(state: IFormState = initialState, action: IAction) {
  let newState: IFormState = clone(state);

  if (appendPhrase.test(action)) {
    newState.phrases.push(action.payload);
    console.log('appendPhrase in reducer. payload:', action.payload, 'state:', state);
    return newState;
  } else if (unsetPhrase.test(action)) {
    newState.phrases.splice(action.payload, 1);
    return newState;
  } else if (setFile.test(action)) {
    newState.filename = action.payload;
    return newState;
  } else if (resetFile.test(action)) {
    newState.filename = '';
    return newState;
  } else if (submitSearch.test(action)) {
    console.log("filename:", newState.filename);
    console.log("first phrase:", newState.phrases[0]);
    return newState;
  }

  return newState;
}
