import { IAction } from '../actions/helpers';
import { clone, isObjectInArray } from '../utils/helpers';
import * as searchesActions from '../actions/searches';
import * as searchFormActions from '../actions/searchForm';
import JsonReader from '../local/searchLoader';

const initialState: ISearchesState = {
  searches: getInitialSearches(),
  currentSearchIndex: 0,
  newSearchName: "",
  isNewSearchUsed: false,
  isValidFile: true,
  newPhrase: "",
  isNewPhraseUsed: false,
}; 

function getInitialSearches(): Array<ISearch> {
  const jsonReader: JsonReader = new JsonReader();
  return jsonReader.getInitialSearches();
};

export interface ISearchesState {
  searches: Array<ISearch>,
  currentSearchIndex: number,
  newSearchName: string,
  isNewSearchUsed: boolean,
  file?: File,
  isValidFile: boolean,
  newPhrase: string,
  isNewPhraseUsed: boolean,
};

export interface ISearch {
  index: number,
  category?: string,
  name: string,
  description?: string,
  phrases: Array<string>,
  isIncluded: boolean,
  isEditing: boolean,
};

export interface IMove {
  initialIndex: number,
  nextIndex: number,
};

export interface IPhrase {
  index: number,
  text: string,
  searchIndex: number
};

export type TState = ISearchesState;

export default function searches(state: ISearchesState = initialState, action: IAction) {
  let newState: ISearchesState = clone(state);

  if (searchesActions.storeSearch.test(action)) {
    newState.searches[action.payload.index] = action.payload;
    return newState;

  } else if (searchesActions.unsetPhrase.test(action)) {
    newState.searches[action.payload.searchIndex].phrases.splice(action.payload.index, 1);
    return newState;

  } else if (searchesActions.flipSearchAsUsed.test(action)) {
    newState.searches[action.payload].isIncluded = !newState.searches[action.payload].isIncluded;
    return newState;

  } else if (searchesActions.setNewSearchName.test(action)) {
    newState.newSearchName = action.payload;
    return newState;

  } else if (searchesActions.setActiveSearch.test(action)) {
    newState.currentSearchIndex = action.payload;
    return newState;
  
  } else if (searchesActions.storeNewSearch.test(action)) {
    if (newState.newSearchName) {
      const search: ISearch = {
        index: newState.searches.length,
        name: newState.newSearchName,
        phrases: [],
        isIncluded: false,
        isEditing: false,
      };
      
      newState.searches.push(search);
      newState.newSearchName = "";
    } else {
      console.log("You must name a new search to add it.")
    }
    return newState;

  } else if (searchesActions.deleteSearch.test(action)) {
    let index: number|null = null;
    newState.searches.map((search, i) => {
      if (search.name === action.payload.name)
        index = i;
    });
    if (typeof index !== 'number') {
      console.log('Search name did not match a pre-existing search to delete.');
      return newState;
    } 
    newState.searches.splice(index, 1);
    return newState;    

  } else if (searchFormActions.setNewPhrase.test(action)) {
    newState.newPhrase = action.payload;
    return newState;

  } else if (searchFormActions.setCategory.test(action)) {
    newState.searches[newState.currentSearchIndex].category = action.payload;
    return newState;

  } else if (searchesActions.storeSearchesFromProfile.test(action)) {
    action.payload.map((search, i) => {
      if (!isObjectInArray(newState.searches, search.name, 'name')) {
        newState.searches.push({
          index: newState.searches.length,
          name: search.name,
          phrases: search.phrases,
          isEditing: false,
          isIncluded: false,
        });
      } else {
        console.log('The search ' + search.name + ' already exists.');
      }
    });

  } else if (searchFormActions.setIsPhraseUsed.test(action)) {
    newState.isNewPhraseUsed = action.payload;
    
    // Clear textarea if phrase no longer being used (or has been added to list of phrases)
    if (!action.payload) {
      newState.newPhrase = '';
    }
    return newState;

  } else if (searchFormActions.setFile.test(action)) {
    newState.isValidFile = true;
    newState.file = action.payload;
    return newState;

  } else if (searchFormActions.resetFile.test(action)) {
    newState.isValidFile = false;
    delete(newState.file);
    return newState;

  } else if (searchFormActions.submitSearch.test(action)) {
    return newState;
  }

  return newState;
}
