// import * as _ from 'lodash'
import FileLoader from './fileLoader'
// import { THRESHOLD_FILE_SIZE } from '../../constants'
import ISearchProgress from '../../types/ISearchProgress';
import ISearch from '../../types/ISearch';
import IResult from '../../types/IResult';
import IExcerpt from '../../types/IExcerpt';

/**
 * An object execute searches on text files.
 */
export default class FileSearcher {
  fileLoader: FileLoader;
  fiveLineContext: string;

  constructor(fileLoader: FileLoader) {
    this.fileLoader = fileLoader
  }

  search(file: File, searches: ISearch[]): Promise<IResult[]> {
    // if (file.size < THRESHOLD_FILE_SIZE) {
    //   return Promise.resolve(this.searchByFullFileContents(file, searches))
    // }

    return this.searchByStream(file, searches)
  }

  // private searchByFullFileContents(file: File, searches: ISearch[]): IResult[] {
  //   let results: Array<IResult> = []
  //   let fileContents: string = this.fileLoader.load(file)
  
  //   if (!fileContents) {
  //     throw new Error(`Unable to load file: ${file.path}`)
  //   }
  
  //   searches.map((search, i) => {
  //     if (search.isIncluded) {
  //       search.phrases.map((phrase, i) => {
  //         let resultIndices: Array<number> = []
  //         let resIndex: number = 0
        
  //         while(resIndex !== -1) {
  //           resIndex = fileContents.toLowerCase().indexOf(phrase.toLowerCase(), resIndex+1)
      
  //           if (resIndex !== -1) {
  //             resultIndices.push(resIndex)
  //           }      
  //         }
      
  //         if (resultIndices.length > 0) {
  //           let result: IResult = {
  //             search: search.name,
  //             phrase: phrase,
  //             excerpts: this.getExcerpts(fileContents, phrase, resultIndices),
  //             show: false,
  //           }
      
  //           results.push(result)
  //         }
  //       })
  //     }
  //   })
  
  //   return results
  // }

  private searchByStream(file: File, searches: ISearch[]): Promise<IResult[]> {
    const stream = this.fileLoader.readFileByStream(file)
    let results: IResult[] = []
    let searchProgress: ISearchProgress[] = this.getInitialSearchProgress(searches)
    let lineCount: number = 0
    stream.on('line', line => {
      lineCount++ 
      this.fiveLineContext += `${line}\n`
      if (lineCount > 5) {
        this.fiveLineContext = this.fiveLineContext.slice(line.length - 1)
      }
      for (let i = 0; i <= line.length; i++) {    // Go through each character in line +1
        let lineChar: string = line[i]
        if (i >= line.length) {   // Empty space for the end of the line
          lineChar = ' '
        }
        for (let j = 0; j < searchProgress.length; j++) {  // Go through each phrase 
          for (let k = 0; k < searchProgress[j].indices.length; k++) {
            searchProgress = this.updateSearchProgressForChar(searchProgress, lineChar, j, k)
            //here
            // let index: number = k
            // let indexValue: number = searchProgress[j].indices[index]
            // let phraseChar: string = searchProgress[j].phrase[indexValue]
            // if (searchProgress[j].isCaseSensitive) {
            //   if (lineChar === phraseChar) {
            //     searchProgress[j].indices[index]++
            //     // TODO: Is this necessary?  !!! This is creating an infinite loop!!!!
            //     // searchProgress[j].indices.push(0)  // Always have a zero index for starting a new potential match.
            // } else {
            //     searchProgress[j].indices.splice(index, 1)  // Remove index if chars don't match.
            //   }
            // } else {
            //   if (lineChar.toLowerCase() === phraseChar.toLowerCase()) {
            //     searchProgress[j].indices[index]++
            //   // TODO: Is this necessary?   !!!!! THis is creating an infinite looppp!!!!
            //   // searchProgress[j].indices.push(0)  // Always have a zero index for starting a new potential match.
            // } else {
            //     searchProgress[j].indices.splice(index, 1)
            //   }
            // }
            // there


            // Success if index of matched chars reaches the end of the phrase:
            if (searchProgress[j].indices[k] === searchProgress[j].phrase.length) {
              const excerpts: IExcerpt[] = this.getStreamedExcerpts(line, lineCount)
              let isNewSearch: boolean = true
              for (let i: number = 0; i < results.length; i++) {
                if (results[i].search === searchProgress[j].searchName) {

                  results[i].excerpts = results[i].excerpts.concat(excerpts)
                  
                  isNewSearch = false
                }
              }

              if (isNewSearch) {
                results.push({
                  search: searchProgress[j].searchName,
                  phrase: searchProgress[j].phrase,
                  excerpts,
                  show: false
                })
              }
                
              searchProgress[j].indices.splice(k, 1)
            }
          }

          if (searchProgress[j].indices.length < 1) {
            searchProgress[j].indices.push(0)
          }
        }
      }
    })

    return new Promise((resolve, reject) => {
      stream.on('close', () => {
        resolve(results)
      })
    })
  }

  private updateSearchProgressForChar(searchProgress: ISearchProgress[], char: string, searchIndex: number, spaceIndex: number): ISearchProgress[] {
    let indexValue: number = searchProgress[searchIndex].indices[spaceIndex]
    let phraseChar: string = searchProgress[searchIndex].phrase[indexValue]
    if (searchProgress[searchIndex].isCaseSensitive) {
      if (char === phraseChar) {
        searchProgress[searchIndex].indices[spaceIndex]++
        // TODO: Is this necessary?  !!! This is creating an infinite loop!!!!
        // searchProgress[j].indices.push(0)  // Always have a zero index for starting a new potential match.
    } else {
        searchProgress[searchIndex].indices.splice(spaceIndex, 1)  // Remove index if chars don't match.
      }
    } else {
      if (char.toLowerCase() === phraseChar.toLowerCase()) {
        searchProgress[searchIndex].indices[spaceIndex]++
      // TODO: Is this necessary?   !!!!! THis is creating an infinite looppp!!!!
      // searchProgress[j].indices.push(0)  // Always have a zero index for starting a new potential match.
    } else {
        searchProgress[searchIndex].indices.splice(spaceIndex, 1)
      }
    }

    return searchProgress
  }
  //   // Success if index of matched chars reaches the end of the phrase:
  //   if (searchProgress[searchIndex].indices[spaceIndex] === searchProgress[j].phrase.length) {
  //     const excerpts: IExcerpt[] = this.getStreamedExcerpts(line, lineCount)
  //     let isNewSearch: boolean = true
  //     for (let i: number = 0; i < results.length; i++) {
  //       if (results[i].search === searchProgress[j].searchName) {

  //         results[i].excerpts = results[i].excerpts.concat(excerpts)
          
  //         isNewSearch = false
  //       }
  //     }

  //     if (isNewSearch) {
  //       results.push({
  //         search: searchProgress[searchIndex].searchName,
  //         phrase: searchProgress[searchIndex].phrase,
  //         excerpts,
  //         show: false
  //       })
  //     }
        
  //     searchProgress[searchIndex].indices.splice(spaceIndex, 1)
  //   }
  // }

//   if (searchProgress[searchIndex].indices.length < 1) {
//     searchProgress[searchIndex].indices.push(0)
//   }
// }

  private getStreamedExcerpts(line: string, lineNumber: number): IExcerpt[] {
    // Wait... this isn't complete... TODO: Have this return plural excerpts.
    return [{
      location: line,
      index: lineNumber,
      text: line,
      pageText: this.fiveLineContext
    }]
  }

  // private getExcerpts(fileContents: string, phrase: string, indices: Array<number>): Array<IExcerpt> {
  //   let excerpts: Array<IExcerpt> = []
  //   const padding: number = 40
  //   const pagePadding: number = 2000
  
  //   indices.map((val, i) => {
  //     let start: number = val - padding > 0 ? val - padding : 0
  //     let end: number = val + phrase.length + padding < fileContents.length ? val + phrase.length + padding : fileContents.length
  //     let pageStart: number = val - pagePadding > 0 ? val - pagePadding : 0
  //     let pageEnd: number = val + phrase.length + pagePadding < fileContents.length ? val + phrase.length + pagePadding : fileContents.length
  
  //     let excerpt: IExcerpt = {
  //       location: 'TODO: determine how to calc page from index',
  //       index: indices[i],
  //       text: fileContents.substring(start, end),
  //       pageText: fileContents.substring(pageStart, pageEnd),
  //     }
  
  //     excerpts.push(excerpt)
  //   })
  
  //   return excerpts
  // }

  private getInitialSearchProgress(searches: ISearch[]): ISearchProgress[] {
    let searchProgress: ISearchProgress[] = []
    for (let i: number = 0; i < searches.length; i++) {
      if (searches[i].isIncluded) {
        for (let j: number = 0; j < searches[i].phrases.length; j++) {
          searchProgress.push({
            searchName: searches[i].name,
            phrase: searches[i].phrases[j],
            indices: [0],
            isCaseSensitive: searches[i].isCaseSensitive
          })
        }
      }
    }
    return searchProgress
  }
}

