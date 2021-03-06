import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import ISearch from "../../types/ISearch";
import IResult from "../../types/IResult";

export default class TextDocWriter {
  saveResults(filename: string, searches: ISearch[], results: IResult[]): string {
    const filepath: string = path.join(os.homedir(), 'Desktop') + '/' + filename;
    let content: string = "";

    content += "Spear Document Search Results:\n"

    searches.map(search => {
      content += "\nFor the search " + search.name + ",\n";
      results.map(result => {
        if (search.name === result.search) {
          content += "    the phrase \"" + result.phrase + "\" found the following results:\n";
          result.excerpts.map(excerpt => {

            const excerptLine: string = excerpt.text.replace(/\r?\n|\r/g, "  ");  

            content += "        - at the location " + excerpt.index + ": " + excerptLine + "\n";
          });
        }
      });
    });

    content += "\n\n\nAll the Searches Used:\n";
    searches.map(search => {
      if (search.isIncluded) {
        content += "    - " + search.name + "\n";
      }
    });
    
    fs.writeFile(filepath, content, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved:', filepath);    
    });

    return filepath;
  }
};
