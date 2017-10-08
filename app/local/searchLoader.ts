import * as fs from "fs";
import { ISearch } from "../reducers/searches";

interface ISearchesProfile {
  searches: Array<ISearch>,
};

export default class JsonReader {
  constructor() {}
  
  load(filepath: string): string {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, 'utf8');
    } else {
      throw new Error('File doesn\'t exist.');
    }
  }

  retrieveSearchesFromFile(filepath: string): Array<ISearch> {
    let searches: Array<ISearch> = [];
    const contents: string = this.load(filepath);
    try {
      const jsonContents: ISearchesProfile = JSON.parse(contents);
      if (!Array.isArray(jsonContents.searches)) {
        new Error('Searches file is missing searches array.');
      }

      jsonContents.searches.map((search, i) => {
        if (search.name && Array.isArray(search.phrases)) {
          let resultSearch: ISearch = {
            index: i,
            name: search.name,
            phrases: search.phrases,
            isIncluded: false,
            isEditing: false,
          };
          if (search.description) {
            resultSearch.description = search.description;
          }

          searches.push(resultSearch);
        }
      });
    } catch(e) {
      console.log('Program had trouble reading contents of file.');
    }

    return searches;
  }
};
