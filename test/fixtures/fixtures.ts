import { IResults } from '../../app/reducers/results'
import { ISearchesState, ISearch, IPhrase } from '../../app/reducers/searches'

export const emptyResultsSet: IResults = {
  hasRun: false,
  items: [],
  overlay: {
    body: '',
    phrase: '',
    search: '',
    show: false,
  },
  showWindow: true,
}

export const sampleResults: IResults = {
  hasRun: true,
  items: [
    {
      search: 'the search',
      phrase: 'what could we find here',
      excerpts: [
        {
          location: 'page 1, line 20',
          index: 250,
          text: 'could we find',
          pageText: 'and they lorem thought could we find where a dog hid',
        }
      ],
      show: false,
    },
  ],
  overlay: {
    body: '',
    phrase: '',
    search: '',
    show: false,
  },
  showWindow: true,
}

export const emptySearchesState: ISearchesState = {
  searches: [],
  currentSearchIndex: 0,
  newSearchName: "",
  isNewSearchUsed: false,
  isValidFile: true,
  newPhrase: "",
  isNewPhraseUsed: false,
}

export const sampleSearch: ISearch = {
  index: 10,
  name: 'a sample search',
  description: 'this is a sample search for testing',
  phrases: ['this one?', 'how bout this one, kid', 'there\'s more...'],
  isIncluded: true,
  isEditing: false,
}

export const samplePhrase: IPhrase = {
  index: 2,
  text: 'just a phrase within the search',
  searchIndex: 0
}