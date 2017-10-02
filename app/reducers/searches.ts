import { IAction } from '../actions/helpers';
import { clone } from '../utils/helpers';
import { storeSearch, deleteSearch, unsetPhrase } from '../actions/searches';
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
  newSearch: null,
  isNewSearchUsed: false,
  filename: "",
  isValidFile: true,
  newPhrase: "",
  isNewPhraseUsed: false,
}; 

export interface ISearchesState {
  searches: Array<ISearch>,
  currentSearchIndex: number,
  newSearch: string|null,
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
    // console.log("first phrase:", newState.search.phrases[0]);
    return newState;
  }

  return newState;
}


// import { IAction } from '../actions/helpers';
// import { submitSearch, setNewPhrase, setIsPhraseUsed, setFile, resetFile } from '../actions/searchForm';
// import { clone } from '../utils/helpers';


// const initialState = { 
//   filename: "",
//   isValidFile: true,
//   phrases: ['hey ma', 'whats up'],
//   newPhrase: "",
//   isNewPhraseUsed: false
// };

// export interface IFormState {
//   filename: string,
//   isValidFile: boolean,
//   phrases: Array<string>,
//   newPhrase: string,
//   isNewPhraseUsed: boolean
// };

// export interface IPhrase {
//   index: number,
//   text: string,
//   searchIndex: number
// };

// export type TState = IFormState;

// export default function searchForm(state: IFormState = initialState, action: IAction) {
//   let newState: IFormState = clone(state);

//   if (appendPhrase.test(action)) {
//     newState.phrases.push(action.payload);
//     return newState;
//   } else if (setNewPhrase.test(action)) {
//     newState.newPhrase = action.payload;
//     return newState;
//   } else if (unsetPhrase.test(action)) {
//     newState.phrases.splice(action.payload, 1);
//     return newState;
//   } else if (setIsPhraseUsed.test(action)) {
//     newState.isNewPhraseUsed = action.payload;
//     return newState;
//   } else if (setFile.test(action)) {
//     newState.isValidFile = true;
//     newState.filename = action.payload;
//     return newState;
//   } else if (resetFile.test(action)) {
//     newState.isValidFile = false;
//     newState.filename = '';
//     return newState;
//   } else if (submitSearch.test(action)) {
//     console.log("filename:", newState.filename);
//     console.log("first phrase:", newState.phrases[0]);
//     return newState;
//   }

//   return newState;
// }
