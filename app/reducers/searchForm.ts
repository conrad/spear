import { IAction } from '../actions/helpers';
import { submitSearch } from '../actions/searchForm';


const initialState = { 
  filename: "",
  phrases: []
};

export interface IFormState {
  filename: string
  phrases: Array<string>
};

export type TState = IFormState;

export default function searchForm(state: IFormState = initialState, action: IAction) {

  // if (enterFormChar.test(action)) {
  //   return state + 1;
  // } else
   if (submitSearch.test(action)) {
    console.log("filename:", state.filename);
    console.log("first phrase:", state.phrases[0]);
    return state;
  }

  return state;
}
