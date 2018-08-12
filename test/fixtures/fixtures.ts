import IResults from '../../app/types/IResults'
import ISearchesState from '../../app/types/ISearchesState';
import ISearch from '../../app/types/ISearch';
import IPhrase from '../../app/types/IPhrase';

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

export const mockFile: File = {
  name: 'thenameofthefile.txt',
  lastModified: 1,
  lastModifiedDate: new Date(1),
  webkitRelativePath: '',
  path: "/all/the/way.txt",
  size: 10,
  type: "gorillaz/clintEastwood",
  msClose() {},
  msDetachStream() {},
  slice() { return new Blob(["hey"]) },
}
