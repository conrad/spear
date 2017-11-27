import searches, { 
  IPhrase, 
  ISearch, 
  ISearchesState,
} from '../../app/reducers/searches'
import { 
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

  it('should handle UNSET_PHRASE', () => {
    const sampleText: string = 'just a sample search phrase here.'
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const search: ISearch = getCopy(sampleSearch)
    search.phrases[samplePhrase.index] = sampleText
    searchesState.searches.push(search)
    const phrase = getCopy(samplePhrase)
    phrase.text = sampleText
    const actual = searches(searchesState, unsetPhrase(phrase))

    expect(actual.searches[0].phrases.length).toEqual(sampleSearch.phrases.length-1)
  })

  it('should throw error when UNSET_PHRASE is given a phrase whose text doesn\'t match the phrase being removed from the search', () => {
    const searchesState: ISearchesState = getCopy(emptySearchesState)
    const search: ISearch = getCopy(sampleSearch)
    searchesState.searches.push(search)

    expect(() => {
      searches(searchesState, unsetPhrase(samplePhrase))
    }).toThrow()
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
    phrase.index = 5

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
})