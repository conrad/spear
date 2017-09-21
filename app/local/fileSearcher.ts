import * as fs from 'fs';

interface IResult {
  phrase: string,
  excerpts: Array<IExcerpt>
};

interface IExcerpt {
  location: string,
  text: string
};

export default function load(filepath: string): string|null  {
     if(fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, 'utf8');
   } else {
      console.log("File Doesn\'t Exist.");
      return null;
   }
}

export function search(filepath: string, phrases: Array<string>): Array<IResult> {
  let file: string|null = load(filepath);

  if (!file) {
    throw new Error('Unable to load file.');
  }

  // TODO: Add in the searching of files.

  return [];
}