import * as path from 'path'
import FileLoader from '../../../app/local/search/fileLoader';

const sampleFilePath: string = '../../fixtures/films-to-watch.txt'

describe('loadTxt', () => {
  const fileLoader: FileLoader = new FileLoader()

  it('returns a string when given a text file', () => {
    const absPath = path.join(__dirname, sampleFilePath)
    const contents: string = fileLoader.loadTxt({ path: absPath } as File)
    const reMatch = new RegExp(/deer hunter/i)
    const reNoMatch = new RegExp(/hary poter/i)

    expect(reMatch.exec(contents)).toBeTruthy()
    expect(reNoMatch.exec(contents)).toBeFalsy()
  })

  it('throws an error when file doesn\'t exist', () => {
    expect(() => {
      fileLoader.loadTxt({ path: 'nada here' } as File)
    }).toThrow()
  })
})
