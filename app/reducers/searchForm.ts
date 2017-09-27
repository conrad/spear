import { IAction } from '../actions/helpers';
import { submitSearch, appendPhrase, setNewPhrase, setIsPhraseUsed, unsetPhrase, setFile, resetFile } from '../actions/searchForm';
import { clone } from '../utils/helpers';


const initialState = { 
  filename: "",
  isValidFile: true,
  phrases: ['hey ma', 'whats up'],
  newPhrase: "",
  isNewPhraseUsed: false
};

export interface IFormState {
  filename: string,
  isValidFile: boolean,
  phrases: Array<string>,
  newPhrase: string,
  isNewPhraseUsed: boolean
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
    newState.newPhrase = action.payload;
    return newState;
  } else if (unsetPhrase.test(action)) {
    newState.phrases.splice(action.payload, 1);
    return newState;
  } else if (setIsPhraseUsed.test(action)) {
    newState.isNewPhraseUsed = action.payload;
    return newState;
  } else if (setFile.test(action)) {
    newState.isValidFile = true;
    newState.filename = action.payload;
    return newState;
  } else if (resetFile.test(action)) {
    newState.isValidFile = false;
    newState.filename = '';
    return newState;
  } else if (submitSearch.test(action)) {
    console.log("filename:", newState.filename);
    console.log("first phrase:", newState.phrases[0]);
    return newState;
  }

  return newState;
}
