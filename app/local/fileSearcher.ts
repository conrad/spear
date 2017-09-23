import * as fs from 'fs';

export interface IResult {
  phrase: string,
  excerpts: Array<IExcerpt>
};

interface IExcerpt {
  location: string,
  index: number,
  text: string
};

export default function load(filepath: string): string  {
  if(fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf8');
  } else {
    throw new Error('File doesn\'t exist.');
  }
}

export function search(filepath: string, phrases: Array<string>): Array<IResult> {
  let file: string = load(filepath);

  if (!file) {
    throw new Error('Unable to load file.');
  }

  let results: Array<IResult> = [];

  phrases.map((phrase, i) => {
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
        phrase: phrase,
        excerpts: getExcerpts(file, phrase, resultIndices)
      };

      results.push(result);
    }
          // let re: string = '/' + phrase.toLowerCase() + '/';
          // let matches: Array<any> = file.toLowerCase().match(re);
  });

  console.log('results:', results);
  return results;
}

function getExcerpts(file: string, phrase: string, indices: Array<number>): Array<IExcerpt> {
  let excerpts: Array<IExcerpt> = [];
  const padding: number = 20;

  indices.map((val, i) => {
    let start: number = val - padding > 0 ? val - padding : 0;
    let end: number = val + phrase.length + padding < file.length ? val + phrase.length + padding : file.length;

    let excerpt: IExcerpt = {
      location: 'TODO: determine how to calc page from index',
      index: indices[i],
      text: file.substring(start, end)
    };

    excerpts.push(excerpt);
  });

  return excerpts;
};