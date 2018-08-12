import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import ISearch from "../../types/ISearch";

interface ISearchesProfile {
  searches: ISearch[],
};

export default class JsonWriter {
  saveProfile(filename: string, searches: ISearchesProfile): string {
    const profileContents: string = JSON.stringify(searches);

    const filepath: string = path.join(os.homedir(), 'Desktop') + '/' + filename;
    
    fs.writeFile(filepath, profileContents, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved:', filepath);    
    });

    return filepath;
  }
};
