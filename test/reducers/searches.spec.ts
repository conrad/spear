import IPhrase from '../../app/types/IPhrase';
import ISearchesState from '../../app/types/ISearchesState';
import ISearch from '../../app/types/ISearch';
import searches from '../../app/reducers/searches'
import { 
  deleteSearch,
  storeNewSearch,
  storeSearch,
  unsetPhrase,
  toggleSearchAsUsed,
} from '../../app/actions/searches'
import { emptySearchesState, sampleSearch, samplePhrase } from '../fixtures/fixtures'
import JsonReader from '../../app/local/import/searchLoader'
import { getCopy } from '../helpers'
import { setNewSearchName } from '../../app/actions/index';

describe('searches reducer', () => {
  it('should retrieve & return an initial searches when none are given', () => {
    const expected: ISearchesState = getCopy(emptySearchesState)
    expected.searches = JsonReader.getInitialSearches()
    expect(searches(undefined, { type: 'unknown' })).toEqual(expected)
  })

  it('should return the same state when matching action type is given', () => {
    const expected: ISearchesState = getCopy(emptySearchesState)
    expect(searches(emptySearchesState, { type: 'unknown' })).toEqual(expected)
  })

  it('should handle STORE_SEARCH', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    // expected.searches[sampleSearch.index] = sampleSearch

    // expect(searches(emptySearchesState, storeSearch(sampleSearch))).toEqual(expected)
    // expect(results(resultsCopy, toggleShowResult(0))).toEqual(newResults)
    // This second assertion does a more complete check because .toEqual "does" check for "deep equality", but it misses the values on objects within this array.
    expect(searches(searchesState, storeSearch(sampleSearch)).searches[sampleSearch.index]).toEqual(sampleSearch)
  })

  describe('UNSET_PHRASE', () => {
    it('should have one less phrase when called properly', () => {
      let phrase: IPhrase                 = getCopy(samplePhrase)
      const searchesState: ISearchesState = getCopy(emptySearchesState)
      const search: ISearch               = getCopy(sampleSearch)

      search.phrases[samplePhrase.phraseIndex] = phrase
      searchesState.searches.push(search)
      const actual = searches(searchesState, unsetPhrase(phrase))
  
      expect(actual.searches[0].phrases.length).toEqual(sampleSearch.phrases.length-1)
    })
    // TODO: Re-add if this validation starts being enforced.
    // it('should throw error when UNSET_PHRASE is given a phrase whose text doesn\'t match the phrase being removed from the search', () => {
    //   const searchesState: ISearchesState = getCopy(emptySearchesState)
    //   const search: ISearch = getCopy(sampleSearch)
    //   searchesState.searches.push(search)
  
    //   expect(() => {
    //     searches(searchesState, unsetPhrase(samplePhrase))
    //   }).toThrow()
    // })
  })


  it('should throw error when UNSET_PHRASE set on non-existent search', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    searchesState.searches.push(sampleSearch)
    const phrase: IPhrase = getCopy(samplePhrase)
    phrase.searchIndex = 5

    expect(() => {
      searches(searchesState, unsetPhrase(phrase))
    }).toThrow()
  })

  it('should throw error when UNSET_PHRASE set on non-existent phrase', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    searchesState.searches.push(sampleSearch)
    const phrase: IPhrase = getCopy(samplePhrase)
    phrase.phraseIndex = 5

    expect(() => {
      searches(searchesState, unsetPhrase(phrase))
    }).toThrow()
  })

  it('should handle TOGGLE_SEARCH_AS_USED', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const search: ISearch = getCopy(sampleSearch)
    searchesState.searches.push(search)
    const diff = searches(searchesState, toggleSearchAsUsed(0))
    expect(diff.searches[0].isIncluded).not.toEqual(sampleSearch.isIncluded)

    const same = searches(diff, toggleSearchAsUsed(0))
    expect(same.searches[0].isIncluded).toEqual(sampleSearch.isIncluded)
  })

  it('should throw error TOGGLE_SEARCH_AS_USED receives a null index', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const search: ISearch = getCopy(sampleSearch)
    searchesState.searches.push(search)

    expect(() => {
      searches(searchesState, toggleSearchAsUsed(4))
    }).toThrow()
  })

  it('should handle SET_NEW_SEARCH_NAME', () => {
    const newName: string = 'The next big search'
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const search: ISearch = getCopy(sampleSearch)
    searchesState.searches.push(search)
    
    const actual = searches(searchesState, setNewSearchName(newName))
    expect(actual.newSearchName).toEqual(newName)
  })

  it('should handle STORE_NEW_SEARCH', () => {
    const newName: string = 'any new name'
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    searchesState.newSearchName = newName
    const search: ISearch = {
      index: searchesState.searches.length,
      name: searchesState.newSearchName,
      phrases: [],
      isIncluded: false,
      isEditing: false,
    }
    const expected: ISearchesState = getCopy(searchesState)
    expected.searches.push(search)
    expected.newSearchName = ''
    const actual = searches(searchesState, storeNewSearch(''))

    expect(actual.newSearchName).toEqual('')
    expect(actual.searches.length).toBeGreaterThan(emptySearchesState.searches.length)
    expect(actual.searches[actual.searches.length-1]).toEqual(expected.searches[actual.searches.length-1])
  })

  it('should throw error when STORE_NEW_SEARCH is not given a name for the new search', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)

    expect(() => {
      searches(searchesState, storeNewSearch(''))
    }).toThrow()
  })

  
  it('should handle DELETE_SEARCH', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const deleteName: string = 'name to go'
    const deleteIndex: number = 1
    const deletedSearch = {
      index: deleteIndex,
      name: deleteName,
      phrases: [],
      isIncluded: false,
      isEditing: false
    }

    searchesState.searches.push(getCopy(sampleSearch))
    
    // Add a second search to be removed.
    const search2: ISearch = getCopy(sampleSearch)
    search2.name = deleteName
    searchesState.searches.push(search2)

    const expected: ISearchesState = getCopy(emptySearchesState)
    expected.searches.push(getCopy(sampleSearch))
    const actual = searches(searchesState, deleteSearch(deletedSearch))
    
    expect(actual.searches.length).toEqual(expected.searches.length)
  })

  it('should throw error when DELETE_SEARCH name does not match', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const deleteName: string = 'name to go'
    const deleteIndex: number = 1
    const deletedSearch = {
      index: deleteIndex,
      name: deleteName,
      phrases: [],
      isIncluded: false,
      isEditing: false
    }

    searchesState.searches.push(getCopy(sampleSearch))
    searchesState.searches.push(getCopy(sampleSearch))

    expect(() => {
      searches(searchesState, deleteSearch(deletedSearch))
    }).toThrow()
  })
})
