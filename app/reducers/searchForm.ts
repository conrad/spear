import { IAction } from '../actions/helpers';
import { submitSearch, appendPhrase, setAddingPhrase, unsetPhrase, setFile, resetFile } from '../actions/searchForm';
import { clone } from './helpers';


const initialState = { 
  filename: "",
  phrases: ['hey ma', 'whats up'],
  isAddingPhrase: false
};

export interface IFormState {
  filename: string,
  phrases: Array<string>,
  isAddingPhrase: boolean
};

export type TState = IFormState;

export default function searchForm(state: IFormState = initialState, action: IAction) {
  let newState: IFormState = clone(state);

  if (appendPhrase.test(action)) {
    newState.phrases.push(action.payload);
    return newState;
  } else if (setAddingPhrase.test(action)) {
    newState.isAddingPhrase = action.payload;
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
