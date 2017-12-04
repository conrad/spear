import FileSearcher from '../../../app/local/search/fileSearcher'
import * as path from 'path'
import { ISearch } from '../../../app/reducers/searches'
import { IResult } from '../../../app/reducers/results'
// import { emptyResultsSet } from '../../fixtures/fixtures'

const sampleFilePath: string = '../../fixtures/films-to-watch.txt'

describe('FileSearcher', () => {
  describe('loadTxt', () => {
    it('returns a string when given a text file', () => {
      const absPath = path.join(__dirname, sampleFilePath)
      const contents: string = FileSearcher.loadTxt({ path: absPath } as File)
      const reMatch = new RegExp(/deer hunter/i)
      const reNoMatch = new RegExp(/hary poter/i)

      expect(reMatch.exec(contents)).toBeTruthy()
      expect(reNoMatch.exec(contents)).toBeFalsy()
    })

    it('throws an error when file doesn\'t exist', () => {
      expect(() => {
        FileSearcher.loadTxt({ path: 'nada here' } as File)
      }).toThrow()
    })
  })

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
      const results: IResult[] = FileSearcher.search({ path: absPath } as File, searches)

      expect(results[0].excerpts).toHaveLength(4)
    })
  })

  describe('search', () => {
    it('returns an empty array when no matches found', () => {
      const absPath = path.join(__dirname, sampleFilePath)
      const searches: ISearch[] = []
      expect(FileSearcher.search({ path: absPath } as File, searches)).toHaveLength(0)
    })
  })
})
