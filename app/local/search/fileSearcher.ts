import * as fs from "fs";
import { IResult, IExcerpt } from "../../reducers/results";
import { ISearch } from "../../reducers/searches";
const extract = require('pdf-text-extract');

const FileSearcher = {
  load(file: File): string  {
    if (file.type === 'application/pdf') {
      return this.loadPdf(file);
    }

    return this.loadTextFile(file);
  },

  loadPdf(file: File): string {
    let fileContents: string = '';
    extract(file.path, { splitPages: false }, function (err: any, text: string) {
      if (err) {
        console.dir(err)
        return;
      }
      console.dir("success:", text)
      fileContents = text;
    });

    return fileContents;
  }, 

  loadTextFile(file: File) {
    if (fs.existsSync(file.path)) {
      return fs.readFileSync(file.path, 'utf8');
    } else {
      throw new Error('File doesn\'t exist.');
    }
  },
  
  search(file: File, searches: Array<ISearch>): Array<IResult> {
    let fileContents: string = this.load(file);
  
    if (!fileContents) {
      throw new Error('Unable to load file.');
    }
  
    let results: Array<IResult> = [];
  
    searches.map((search, i) => {
      if (search.isIncluded) {
        search.phrases.map((phrase, i) => {
          let resultIndices: Array<number> = [];
          let resIndex: number = 0;
        
          while(resIndex !== -1) {
            resIndex = fileContents.toLowerCase().indexOf(phrase.toLowerCase(), resIndex+1);
      
            if (resIndex !== -1) {
              resultIndices.push(resIndex);
            }      
          }
      
          if (resultIndices.length > 0) {
            let result: IResult = {
              search: search.name,
              phrase: phrase,
              excerpts: this.getExcerpts(fileContents, phrase, resultIndices),
              show: false,
            };
      
            results.push(result);
          }
        });
      }
    });
  
    return results;
  },

  getExcerpts(fileContents: string, phrase: string, indices: Array<number>): Array<IExcerpt> {
    let excerpts: Array<IExcerpt> = [];
    const padding: number = 40;
    const pagePadding: number = 2000;
  
    indices.map((val, i) => {
      let start: number = val - padding > 0 ? val - padding : 0;
      let end: number = val + phrase.length + padding < fileContents.length ? val + phrase.length + padding : fileContents.length;
      let pageStart: number = val - pagePadding > 0 ? val - pagePadding : 0;
      let pageEnd: number = val + phrase.length + pagePadding < fileContents.length ? val + phrase.length + pagePadding : fileContents.length;
  
      let excerpt: IExcerpt = {
        location: 'TODO: determine how to calc page from index',
        index: indices[i],
        text: fileContents.substring(start, end),
        pageText: fileContents.substring(pageStart, pageEnd),
      };
  
      excerpts.push(excerpt);
    });
  
    return excerpts;
  }
}

export default FileSearcher  
