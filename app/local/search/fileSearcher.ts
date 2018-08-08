import SearchesTrie from './trie'
import FileLoader from './fileLoader'
import { THRESHOLD_FILE_SIZE } from '../../constants'
import { ReadLine } from 'readline';
import { ISearchProgress } from '../../types/ISearchProgress';
import { ISearch, IPhrase } from '../../reducers/searches';
import { IResult } from '../../types/IResult';
import { IExcerpt } from '../../types/IExcerpt';

/**
 * An object execute searches on text files.
 */
export default class FileSearcher {
  fileLoader: FileLoader;

  constructor(fileLoader: FileLoader) {
    this.fileLoader = fileLoader
  }

  search(file: File, searches: ISearch[]): Promise<IResult[]> {
    if (file.size < THRESHOLD_FILE_SIZE) {
      return Promise.resolve(this.searchByFullFileContents(file, searches))
    }

    return this.searchByStream(file, searches)
  }

  searchByFullFileContents(file: File, searches: ISearch[]): IResult[] {
    let fileContents: string = this.fileLoader.load(file)
  
    if (!fileContents) {
      throw new Error('Unable to load file: ' + file.path)
    }
  
    let results: Array<IResult> = []
  
    searches.map((search, i) => {
      if (search.isIncluded) {
        search.phrases.map((phrase, i) => {
          let resultIndices: Array<number> = []
          let resIndex: number = 0
        
          while(resIndex !== -1) {
            resIndex = fileContents.toLowerCase().indexOf(phrase.toLowerCase(), resIndex+1)
      
            if (resIndex !== -1) {
              resultIndices.push(resIndex)
            }      
          }
      
          if (resultIndices.length > 0) {
            let result: IResult = {
              search: search.name,
              phrase: phrase,
              excerpts: this.getExcerpts(fileContents, phrase, resultIndices),
              show: false,
            }
      
            results.push(result)
          }
        })
      }
    })
  
    return results
  }

  searchByStream(file: File, searches: ISearch[]): Promise<IResult[]> {
    const stream = this.fileLoader.loadFileByStream(file)
    let results: IResult[]
    let searchProgress: ISearchProgress[] = []

    stream.on('line', line => {
      // this.searchLine(searches, line)
      // search the line and chain to the next one. Maintain results and add to them.
      for (let i = 0; i < line.length; i++) {
        for (let j = 0; j < searchProgress.length; j++) {
          let lineChar = line[i]
          let phraseChar = searchProgress[j].phrase[searchProgress[j].index]
          if (lineChar === phraseChar) {
            
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

  trieSearch(file: File, searches: ISearch[]): IResult[] {
    let fileContents: string = this.fileLoader.load(file)
    let results: Array<IResult> = []
    
    if (!fileContents) {
      throw new Error('Unable to load file: ' + file.path)
    }
  
    const searchesTrie: SearchesTrie = new SearchesTrie()
    searchesTrie.addSearches(searches)

    const foundPhrases: IPhrase[] = searchesTrie.findPhrase(fileContents)

    foundPhrases.forEach((phrase) => {
      let result: IResult = {
        search: searches[phrase.searchIndex].name,
        phrase: phrase.text,
        excerpts: [], // TODO: this.getExcerpts(fileContents, phrase.text, resultIndices),
        show: false,
      }

      results.push(result)
    })

    return results
  }

  getExcerpts(fileContents: string, phrase: string, indices: Array<number>): Array<IExcerpt> {
    let excerpts: Array<IExcerpt> = []
    const padding: number = 40
    const pagePadding: number = 2000
  
    indices.map((val, i) => {
      let start: number = val - padding > 0 ? val - padding : 0
      let end: number = val + phrase.length + padding < fileContents.length ? val + phrase.length + padding : fileContents.length
      let pageStart: number = val - pagePadding > 0 ? val - pagePadding : 0
      let pageEnd: number = val + phrase.length + pagePadding < fileContents.length ? val + phrase.length + pagePadding : fileContents.length
  
      let excerpt: IExcerpt = {
        location: 'TODO: determine how to calc page from index',
        index: indices[i],
        text: fileContents.substring(start, end),
        pageText: fileContents.substring(pageStart, pageEnd),
      }
  
      excerpts.push(excerpt)
    })
  
    return excerpts
  }
}

