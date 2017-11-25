import { IResults } from '../../app/reducers/results'

export const emptyResultsSet: IResults = {
  hasRun: false,
  items: [],
  overlay: {
    body: '',
    phrase: '',
    search: '',
    show: false,
  }
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
  }
}
