import * as path from 'path'
import FileLoader from '../../../app/local/search/fileLoader';
import { THRESHOLD_FILE_SIZE } from '../../../app/constants';

const sampleFilePath: string = '../../fixtures/films-to-watch.txt'
const absPath = path.join(__dirname, sampleFilePath)

describe('FileLoader', () => {
  const fileLoader: FileLoader = new FileLoader()

  describe('load', () => {

    it('returns a string when given a small text file', () => {
      expect(typeof fileLoader.load({ path: absPath, size: THRESHOLD_FILE_SIZE - 1 } as File)).toBe('string')
    })

    it('returns a string with the expected contents of a small text file', () => {
      const contents: string = fileLoader.load({ path: absPath, size: THRESHOLD_FILE_SIZE - 1 } as File)
      const reMatch = new RegExp(/deer hunter/i)
      const reNoMatch = new RegExp(/hary poter/i)
  
      expect(reMatch.exec(contents)).toBeTruthy()
      expect(reNoMatch.exec(contents)).toBeFalsy()
    })

    // it('returns a stream when given a large text file', () => {
    //   expect(typeof fileLoader.load({ path: absPath, size: THRESHOLD_FILE_SIZE + 1 } as File)).toBe('stream')
    // })
  
    it('throws an error when file doesn\'t exist', () => {
      expect(() => {
        fileLoader.load({ path: 'nada here' } as File)
      }).toThrow()
    })
  })

  // describe('loadPdf' () => {})

  describe('readFileByStream', () => {
    it('returns a stream', () => {
      expect(fileLoader.readFileByStream({ path: absPath, size: THRESHOLD_FILE_SIZE + 1 } as File).hasOwnProperty('input')).toBeTruthy()
    })
  })
})

  // describe('loadTxt', () => {
  //   const fileLoader: FileLoader = new FileLoader()
  
  //   it('returns a string when given a text file', () => {
  //     const absPath = path.join(__dirname, sampleFilePath)
  //     const contents: string = fileLoader.loadTxt({ path: absPath } as File)
  //     const reMatch = new RegExp(/deer hunter/i)
  //     const reNoMatch = new RegExp(/hary poter/i)
  
  //     expect(reMatch.exec(contents)).toBeTruthy()
  //     expect(reNoMatch.exec(contents)).toBeFalsy()
  //   })
  
  //   it('throws an error when file doesn\'t exist', () => {
  //     expect(() => {
  //       fileLoader.loadTxt({ path: 'nada here' } as File)
  //     }).toThrow()
  //   })
  // })
