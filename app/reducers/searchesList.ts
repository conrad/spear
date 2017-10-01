import { IAction } from '../actions/helpers';
import { storeSearch, deleteSearch } from '../actions/searchesList';
import { clone } from '../utils/helpers';

const initialState: ISearchesState = {
  searches: [],
  newSearch: null,
  isNewSearchUsed: false
}; 

export interface ISearchesState {
  searches: Array<ISearch>,
  newSearch: string|null,
  isNewSearchUsed: boolean,
};

export interface ISearch {
  index: number,
  name: string,
  description: string|null,
  phrases: Array<string>,
  isIncluded: boolean,
  isEditing: boolean,
};

export interface IMove {
  initialIndex: number,
  nextIndex: number,
};

export type TState = ISearchesState;

export default function searchForm(state: ISearchesState = initialState, action: IAction) {
  let newState: ISearchesState = clone(state);
  if (storeSearch.test(action)) {
    newState.searches.push(action.payload);
    return newState;
  } else if (deleteSearch.test(action)) {
    // if (action.payload.name == newState[action.payload.index].name) {
      newState.searches.splice(action.payload.index, 1);
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
