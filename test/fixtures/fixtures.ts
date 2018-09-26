import IResults from '../../app/types/IResults'
import ISearchesState from '../../app/types/ISearchesState';
import ISearch from '../../app/types/ISearch';
import IPhrase from '../../app/types/IPhrase';
import { getCopy } from '../helpers';
import { createPhrase } from '../../app/utils/helpers';

export const emptyResultsSet: IResults = {
  hasRun: false,
  items: [],
  overlay: {
    body: '',
    phrase: createPhrase(),
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
      phrase: createPhrase('what could we find here', 0, 0, false, true),
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
    phrase: createPhrase(),
    search: '',
    show: false,
  },
  showWindow: true,
}

export const samplePhrase: IPhrase = {
  text: 'just a phrase within the search',
  searchIndex: 0,
  phraseIndex: 2,
  isCaseSensitive: true,
  isExactMatch: true,
}

let samplePhrases: IPhrase[] = [
  getCopy(samplePhrase),
  getCopy(samplePhrase),
  getCopy(samplePhrase),
]

samplePhrases[0].text = 'this one?'
samplePhrases[1].text = 'how bout this one, kid'
samplePhrases[2].text = 'there\'s more...'

export const sampleSearch: ISearch = {
  index: 10,
  name: 'a sample search',
  description: 'this is a sample search for testing',
  phrases: samplePhrases,
  isIncluded: true,
  isEditing: false,
}

export const emptySearchesState: ISearchesState = {
  searches: [],
  currentSearchIndex: 0,
  newSearchName: '',
  isNewSearchUsed: false,
  isValidFile: true,
  newPhrase: samplePhrase,
  isNewPhraseUsed: false,
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
