import * as fs from "fs";
import { IResult, IExcerpt } from "../reducers/results";
import { ISearch } from "../reducers/searches";

export default function load(filepath: string): string  {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf8');
  } else {
    throw new Error('File doesn\'t exist.');
  }
}

export function search(filepath: string, searches: Array<ISearch>): Array<IResult> {
  let file: string = load(filepath);

  if (!file) {
    throw new Error('Unable to load file.');
  }

  let results: Array<IResult> = [];

  searches.map((search, i) => {
    if (search.isIncluded) {
      search.phrases.map((phrase, i) => {
        let resultIndices: Array<number> = [];
        let resIndex: number = 0;
      
        while(resIndex !== -1) {
          resIndex = file.toLowerCase().indexOf(phrase.toLowerCase(), resIndex+1);
    
          if (resIndex !== -1) {
            resultIndices.push(resIndex);
          }      
        }
    
        if (resultIndices.length > 0) {
          let result: IResult = {
            search: search.name,
            phrase: phrase,
            excerpts: getExcerpts(file, phrase, resultIndices),
            show: false,
          };
    
          results.push(result);
        }
      });
    }
  });

  return results;
}

function getExcerpts(file: string, phrase: string, indices: Array<number>): Array<IExcerpt> {
  let excerpts: Array<IExcerpt> = [];
  const padding: number = 40;
  const pagePadding: number = 2000;

  indices.map((val, i) => {
    let start: number = val - padding > 0 ? val - padding : 0;
    let end: number = val + phrase.length + padding < file.length ? val + phrase.length + padding : file.length;
    let pageStart: number = val - pagePadding > 0 ? val - pagePadding : 0;
    let pageEnd: number = val + phrase.length + pagePadding < file.length ? val + phrase.length + pagePadding : file.length;

    let excerpt: IExcerpt = {
      location: 'TODO: determine how to calc page from index',
      index: indices[i],
      text: file.substring(start, end),
      pageText: file.substring(pageStart, pageEnd),
    };

    excerpts.push(excerpt);
  });

  return excerpts;
};