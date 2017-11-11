import { IResults } from '../app/reducers/results'

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
