import { IAction } from '../actions/helpers';
import { submitSearch, appendPhrase, setNewPhrase, unsetPhrase, setFile, resetFile } from '../actions/searchForm';
import { clone } from './helpers';


const initialState = { 
  filename: "",
  phrases: ['hey ma', 'whats up'],
  newPhrase: ""
};

export interface IFormState {
  filename: string,
  phrases: Array<string>,
  newPhrase: string
};

export interface IPhrase {
  index: number,
  text: string,
  search?: string
};

export type TState = IFormState;

export default function searchForm(state: IFormState = initialState, action: IAction) {
  let newState: IFormState = clone(state);

  if (appendPhrase.test(action)) {
    newState.phrases.push(action.payload);
    return newState;
  } else if (setNewPhrase.test(action)) {
    console.log('setPhrase action:', action.payload);
    newState.newPhrase = action.payload;
    // newState.phrases[action.payload.index] = action.payload.text;
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
