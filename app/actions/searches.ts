import { actionCreator, actionCreatorVoid } from './helpers';
import JsonReader from '../local/import/searchLoader';
import JsonWriter from '../local/export/searchExporter';
import * as constants from '../constants'
import ISearch from '../types/ISearch';
import IMove from '../types/IMove';
import IPhrase from '../types/IPhrase';

export const storeSearch = actionCreator<ISearch>(constants.STORE_SEARCH);
export const deleteSearch = actionCreator<ISearch>(constants.DELETE_SEARCH)
export const moveSearch = actionCreator<IMove>(constants.MOVE_SEARCH)
export const unsetPhrase = actionCreator<IPhrase>(constants.UNSET_PHRASE)
export const toggleSearchAsUsed = actionCreator<number>(constants.TOGGLE_SEARCH_AS_USED)
export const setNewSearchName = actionCreator<string>(constants.SET_NEW_SEARCH_NAME);
export const storeNewSearch = actionCreator(constants.STORE_NEW_SEARCH);
export const setActiveSearch = actionCreator<number>(constants.SET_ACTIVE_SEARCH);
export const storeSearchesFromProfile = actionCreator<Array<ISearch>>(constants.STORE_SEARCHES_FROM_PROFILE)
export const exportSearchesToFile = actionCreatorVoid(constants.EXPORT_SEARCHES_TO_FILE) 

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

export function setSearchAsUsed(index: number, isUsed: boolean|null) {
  return (dispatch: Function) => {
    dispatch(toggleSearchAsUsed(index));
  };
}

export function updateNewSearchName(name: string) {
  return (dispatch: Function) => {
    dispatch(setNewSearchName(name));
  };    
}

export function exportSearches() {
  return (dispatch: Function, getState: Function) => {
    const { searches } = getState();
    const jsonWriter = new JsonWriter();
    try {
      jsonWriter.saveProfile('searches_profile.json', searches);
    } catch (e) {
      console.log('Error saving searches:', e)
    }
    // dispatch(exportSearchesToFile());
  }
}

export function addSearchesFromProfile(file: File) {
  const searches: Array<ISearch> = JsonReader.retrieveSearchesFromFile(file.path);

  return (dispatch: Function) => {
    dispatch(storeSearchesFromProfile(searches))
  }
}

export function addNewSearch() {
  return (dispatch: Function) => {
    dispatch(storeNewSearch(''));
  }
}

export function selectSearch(index: number) {
  return (dispatch: Function) => {
    dispatch(setActiveSearch(index));
  }
}

export function removeSearch(index: number, name: string) {
  return (dispatch: Function) => {
    const search = {
      index,
      name,
      phrases: [],
      isIncluded: false,
      isEditing: false
    }
    dispatch(deleteSearch(search))
  }
}
