import { IAction } from '../actions/helpers';
import { storeSearch, deleteSearch } from '../actions/searches';
import { clone } from './helpers';

const initialState: Array<ISearch> = []; 

export interface ISearch {
  index: number,
  name: string,
  description: string|null,
  phrases: Array<string>,
  isEditing: boolean
};

export interface IMove {
  initialIndex: number,
  nextIndex: number
};

export type TState = Array<ISearch>;

export default function searchForm(state: Array<ISearch> = initialState, action: IAction) {
  let newState: Array<ISearch> = clone(state);
  if (storeSearch.test(action)) {
    newState.push(action.payload);
    return newState;
  } else if (deleteSearch.test(action)) {
    // if (action.payload.name == newState[action.payload.index].name) {
      newState.splice(action.payload.index, 1);
    // }
    return newState;
  }

  return newState;
}


  // if (createSearch.test(action)) {
  //   newState.push(action.payload);
  //   console.log('appendPhrase in reducer. payload:', action.payload, 'state:', state);
  //   return newState;
  // } else 
