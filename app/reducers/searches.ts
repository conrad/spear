import { IAction } from '../actions/helpers';
import { clone, isObjectInArray } from '../utils/helpers';
import { storeSearchesFromProfile, setActiveSearch, setNewSearchName, storeNewSearch, storeSearch, deleteSearch, unsetPhrase, flipSearchAsUsed } from '../actions/searches';
import { submitSearch, setNewPhrase, setIsPhraseUsed, setFile, resetFile } from '../actions/searchForm';


const initialState: ISearchesState = {
  searches: [{
    index: 0,
    name: "Commerce Clause",
    phrases: ['hey ma', 'whats up'],
    isIncluded: true,
    isEditing: false,
  }],
  currentSearchIndex: 0,
  newSearchName: "",
  isNewSearchUsed: false,
  filename: "",
  isValidFile: true,
  newPhrase: "",
  isNewPhraseUsed: false,
}; 

export interface ISearchesState {
  searches: Array<ISearch>,
  currentSearchIndex: number,
  newSearchName: string,
  isNewSearchUsed: boolean,
  filename: string,
  isValidFile: boolean,
  newPhrase: string,
  isNewPhraseUsed: boolean,
};

export interface ISearch {
  index: number,
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

  if (storeSearch.test(action)) {
    newState.searches[action.payload.index] = action.payload;
    return newState;

  } else if (unsetPhrase.test(action)) {
    newState.searches[action.payload.searchIndex].phrases.splice(action.payload.index, 1);
    return newState;

  } else if (flipSearchAsUsed.test(action)) {
    newState.searches[action.payload].isIncluded = !newState.searches[action.payload].isIncluded;
    return newState;

  } else if (setNewSearchName.test(action)) {
    newState.newSearchName = action.payload;
    return newState;

  } else if (setActiveSearch.test(action)) {
    newState.currentSearchIndex = action.payload;
    return newState;
  
  } else if (storeNewSearch.test(action)) {
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

  } else if (deleteSearch.test(action)) {
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

  } else if (setNewPhrase.test(action)) {
    newState.newPhrase = action.payload;
    return newState;

  } else if (storeSearchesFromProfile.test(action)) {
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

  } else if (setIsPhraseUsed.test(action)) {
    newState.isNewPhraseUsed = action.payload;
    
    // Clear textarea if phrase no longer being used (or has been added to list of phrases)
    if (!action.payload) {
      newState.newPhrase = '';
    }
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
    return newState;
  }

  return newState;
}

