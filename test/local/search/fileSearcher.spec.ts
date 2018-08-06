import FileSearcher from '../../../app/local/search/fileSearcher'
import * as path from 'path'
import { ISearch } from '../../../app/reducers/searches'
import { IResult } from '../../../app/reducers/results'
import FileLoader from '../../../app/local/search/fileLoader';
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
      const results: IResult[] = fileSearcher.search({ path: absPath } as File, searches)

      expect(results[0].excerpts).toHaveLength(4)
    })
  })

  describe('search', () => {
    it('returns an empty array when no matches found', () => {
      const absPath = path.join(__dirname, sampleFilePath)
      const searches: ISearch[] = []
      expect(fileSearcher.search({ path: absPath } as File, searches)).toHaveLength(0)
    })
  })
})
