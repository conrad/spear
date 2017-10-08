import { actionCreator } from './helpers';
import { IPhrase, ISearch, IMove } from '../reducers/searches';

export const storeSearch = actionCreator<ISearch>('STORE_SEARCH');
export const deleteSearch = actionCreator<ISearch>('DELETE_SEARCH');
export const moveSearch = actionCreator<IMove>('MOVE_SEARCH');
export const unsetPhrase = actionCreator<IPhrase>('UNSET_PHRASE');
export const flipSearchAsUsed = actionCreator<number>('FLIP_SEARCH_AS_USED');
export const setNewSearchName = actionCreator<string>('SET_NEW_SEARCH_NAME');
export const storeNewSearch = actionCreator('STORE_NEW_SEARCH');
export const setActiveSearch = actionCreator<number>('SET_ACTIVE_SEARCH');
export const storeSearchesFromProfile = actionCreator<Array<ISearch>>('STORE_SEARCHES_FROM_PROFILE');

export function addSearch(search: ISearch) {
  return (dispatch: Function) => {
    dispatch(storeSearch(search));
  }
}

export function updateSearch(search: ISearch) {
  return (dispatch: Function) => {
    dispatch(storeSearch(search));
  }
}

export function reorderSearch(move: IMove) {
  return (dispatch: Function) => {
    dispatch(moveSearch(move));
  };
}

export function deletePhrase(phraseIndex: number, searchIndex: number) {
  return (dispatch: Function) => {
    const phrase: IPhrase = {
      index: phraseIndex,
      text: '',
      searchIndex,
    };
    
    dispatch(unsetPhrase(phrase));
  }    
}

export function setSearchAsUsed(index: number) {
  return (dispatch: Function) => {
    dispatch(flipSearchAsUsed(index));
  };
}

export function updateNewSearchName(name: string) {
  return (dispatch: Function) => {
    dispatch(setNewSearchName(name));
  };    
}

export function addSearchesFromProfile(searches: Array<ISearch>) {
  return (dispatch: Function) => {
    dispatch(storeSearchesFromProfile(searches));
  };    
}

export function addNewSearch() {
  return (dispatch: Function) => {
    dispatch(storeNewSearch(''));
  };     
}

export function selectSearch(index: number) {
  return (dispatch: Function) => {
    dispatch(setActiveSearch(index));
  };     
}

export function removeSearch(index: number, name: string) {
  return (dispatch: Function) => {
    const search = {
      index,
      name,
      phrases: [],
      isIncluded: false,
      isEditing: false
    };
    dispatch(deleteSearch(search));
  };
}
