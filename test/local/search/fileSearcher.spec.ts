import FileSearcher from '../../../app/local/search/fileSearcher'
import * as path from 'path'
import IResult from '../../../app/types/IResult'
import FileLoader from '../../../app/local/search/fileLoader'
import ISearch from '../../../app/types/ISearch'
import IPhrase from '../../../app/types/IPhrase'
import { samplePhrase } from '../../fixtures/fixtures'
import { getCopy } from '../../helpers'
// import { emptyResultsSet } from '../../fixtures/fixtures'

// TODO: Refactor not to use real file nor real FileLoader
const basicFilePath: string = '../../fixtures/films-to-watch.txt'
const spacesFilePath: string = '../../fixtures/spaces.txt'

describe('FileSearcher', () => {
  const fileSearcher: FileSearcher = new FileSearcher(new FileLoader())
  
  describe('search', () => {
    it('returns the expected set of matches found', () => {
      const absPath = path.join(__dirname, basicFilePath)
      let billPhrase: IPhrase = getCopy(samplePhrase)
      billPhrase.text = 'bill'
      const searches: ISearch[] = [{
        index: 0,
        name: 'bills',
        phrases: [billPhrase],
        isIncluded: true,
        isEditing: false
      }]
      const resultsPromise: Promise<IResult[]> = fileSearcher.search({ path: absPath } as File, searches)
      return resultsPromise.then(results => {
        expect(results[0].excerpts).toHaveLength(4)
      })
    })

    it('returns an empty array when no matches found', () => {
      const absPath = path.join(__dirname, basicFilePath)
      const searches: ISearch[] = []
      const resultsPromise: Promise<IResult[]> = fileSearcher.search({ path: absPath } as File, searches)
      resultsPromise.then(results => {
        console.log('resssssssults!!!!!!!', results)
        expect(results).toHaveLength(0)
      })
    })

    it('returns a match even when there are extra spaces in the file text', () => {
      const absPath = path.join(__dirname, spacesFilePath)
      let pulpFictionPhrase: IPhrase = getCopy(samplePhrase)
      pulpFictionPhrase.text = 'pulp fiction'
      const searches: ISearch[] = [{
        index: 0,
        name: 'spaces',
        phrases: [pulpFictionPhrase],
        isIncluded: true,
        isEditing: false
      }]
      const resultsPromise: Promise<IResult[]> = fileSearcher.search({ path: absPath } as File, searches)
      resultsPromise.then(results => {
        expect(results).toHaveLength(1)
        console.log('resssssssulttttttts!!!!!!!', results)
        expect(results[0].excerpts).toHaveLength(1)
      })
    })
  })
})
