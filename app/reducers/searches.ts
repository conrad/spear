import { IAction } from '../actions/helpers'
import { clone, isObjectInArray } from '../utils/helpers'
import { 
  storeSearchesFromProfile, 
  setActiveSearch, 
  setNewSearchName, 
  storeNewSearch, 
  storeSearch, 
  deleteSearch, 
  unsetPhrase, 
  toggleSearchAsUsed 
} from '../actions/searches'
import {
  submitSearch,
  setNewPhrase,
  setIsPhraseUsed,
  setFile,
  resetFile,
} from '../actions/searchForm'
import JsonReader from '../local/import/searchLoader'
import ISearch from '../types/ISearch';
import ISearchesState from '../types/ISearchesState';

const initialState: ISearchesState = {
  searches: getInitialSearches(),
  currentSearchIndex: 0,
  newSearchName: "",
  isNewSearchUsed: false,
  isValidFile: true,
  newPhrase: "",
  isNewPhraseUsed: false,
}

function getInitialSearches(): ISearch[] {
  return JsonReader.getInitialSearches()
}

export type TState = ISearchesState

export default function searches(state: ISearchesState = initialState, action: IAction) {
  let newState: ISearchesState = clone(state)

  if (storeSearch.test(action)) {
    newState.searches[action.payload.index] = action.payload
    return newState

  } else if (unsetPhrase.test(action)) {
    if (!newState.searches[action.payload.searchIndex]) {
      throw new Error('Attempted to unset phrase on search, but the search doesn\'t exist.')
    }

    const phrases: string[] = newState.searches[action.payload.searchIndex].phrases
    if (!phrases[action.payload.index]) {
      throw new Error('Attempted to unset phrase on search, but the phrase index doesn\'t exist on search.')
    }

    if (phrases[action.payload.index] !== action.payload.text) {
      throw new Error(`Attempted to unset phrase, but the text doesn\'t match between the phrases: ${phrases[action.payload.index]}, ${action.payload.text}`)
    }

    phrases.splice(action.payload.index, 1)
    return newState

  } else if (toggleSearchAsUsed.test(action)) {
    newState.searches[action.payload].isIncluded = !newState.searches[action.payload].isIncluded
    return newState

  } else if (setNewSearchName.test(action)) {
    newState.newSearchName = action.payload
    return newState

  } else if (setActiveSearch.test(action)) {
    newState.currentSearchIndex = action.payload
    return newState
  
  } else if (storeNewSearch.test(action)) {
    if (newState.newSearchName) {
      const search: ISearch = {
        index: newState.searches.length,
        name: newState.newSearchName,
        phrases: [],
        isIncluded: false,
        isEditing: false,
      }
      
      newState.searches.push(search)
      newState.newSearchName = ""
    } else {
      throw new Error('You must name a new search to add it.')
    }
    return newState

  } else if (deleteSearch.test(action)) {
    let index: number|null = null
    newState.searches.map((search, i) => {
      if (search.name === action.payload.name)
        index = i
    })
    if (typeof index !== 'number') {
      throw new Error('Search name did not match a pre-existing search to delete.')
    } 
    newState.searches.splice(index, 1)
    return newState

  } else if (setNewPhrase.test(action)) {
    newState.newPhrase = action.payload
    return newState

  } else if (storeSearchesFromProfile.test(action)) {
    action.payload.map((search, i) => {
      if (!isObjectInArray(newState.searches, search.name, 'name')) {
        newState.searches.push({
          index: newState.searches.length,
          name: search.name,
          phrases: search.phrases,
          isEditing: false,
          isIncluded: false,
        })
      } else {
        console.log('The search ' + search.name + ' already exists.')
      }
    })

  } else if (setIsPhraseUsed.test(action)) {
    newState.isNewPhraseUsed = action.payload
    
    // Clear textarea if phrase no longer being used (or has been added to list of phrases)
    if (!action.payload) {
      newState.newPhrase = ''
    }
    return newState

  } else if (setFile.test(action)) {
    newState.isValidFile = true
    newState.file = action.payload
    return newState

  } else if (resetFile.test(action)) {
    newState.isValidFile = false
    delete(newState.file)
    return newState

  } else if (submitSearch.test(action)) {
    return newState
  }

  return newState
}
