import * as fs from "fs";
import { ISearch } from "../reducers/searches";

interface ISearchesProfile {
  searches: Array<ISearch>,
};

export default class JsonReader {
  load(filepath: string): string {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, 'utf8');
    } else {
      throw new Error('File doesn\'t exist.');
    }
  }

  retrieveSearchesFromFile(filepath: string): Array<ISearch> {
    const contents: string = this.load(filepath);
    try {
      const jsonContents: ISearchesProfile = JSON.parse(contents);
      if (!Array.isArray(jsonContents.searches)) {
        new Error('')
      }

      jsonContents.searches.map((search, i) => {
        if (search instanceof ISearch) {
          
        }
      });
      } catch(e) {
      console.log('Program had trouble reading contents of file.');
      return [];
    }


    return [];
  }
};

