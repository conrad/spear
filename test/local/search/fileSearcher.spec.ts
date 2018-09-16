import FileSearcher from '../../../app/local/search/fileSearcher'
import * as path from 'path'
import IResult from '../../../app/types/IResult'
import FileLoader from '../../../app/local/search/fileLoader';
import ISearch from '../../../app/types/ISearch';
// import { emptyResultsSet } from '../../fixtures/fixtures'

// TODO: Refactor not to use real file nor real FileLoader
const sampleFilePath: string = '../../fixtures/films-to-watch.txt'

describe('FileSearcher', () => {
  const fileSearcher: FileSearcher = new FileSearcher(new FileLoader())

  describe('search', () => {
    it('returns the expected set of matches found', () => {
      const absPath = path.join(__dirname, sampleFilePath)
      const searches: ISearch[] = [{
        index: 0,
        name: 'bills',
        phrases: ['bill'],
        isIncluded: true,
        isEditing: false,      
      }]
      const resultsPromise: Promise<IResult[]> = fileSearcher.search({ path: absPath } as File, searches)
      return resultsPromise.then(results => {
        expect(results[0].excerpts).toHaveLength(4)
      })
    })
  })

  describe('search', () => {
    it('returns an empty array when no matches found', () => {
      const absPath = path.join(__dirname, sampleFilePath)
      const searches: ISearch[] = []
      const resultsPromise: Promise<IResult[]> = fileSearcher.search({ path: absPath } as File, searches)
      resultsPromise.then(results => {
        expect(results[0].excerpts).toHaveLength(0)
      })
    })
  })
})
