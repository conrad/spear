import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearch } from '../../../../reducers/searches';
import JsonReader from '../../../../local/searchLoader';

let styles = require('./ProfileInput.scss');

export interface IProps extends RouteComponentProps<any> {
  addSearchesFromProfile(searches: Array<ISearch>): void,
  toggleMenuDropDown(): void,
}

export class ProfileInput extends React.Component<IProps> {
  handleChange(selectorFiles: FileList | null) {
    this.props.toggleMenuDropDown();
    if (selectorFiles == null) {
      console.log('nope. need to submit a file.')
      return;
    }
    if (selectorFiles.length > 1) { 
      console.log('NOTE: Multiple files loaded on this input.');
    }

    if (selectorFiles[0].type === 'application/json') {
      const searches: Array<ISearch> = this.getSearches(selectorFiles[0]);
      this.props.addSearchesFromProfile(searches);
      console.log('adding these searches:', searches);
    } else {
      console.log('incorrect file type');
    }
  }

  getSearches(file: File): Array<ISearch> {
    const jsonReader: JsonReader = new JsonReader();
    return jsonReader.retrieveSearchesFromFile(file.path);
  }

  render() {
    return (
      <div className={styles.inputBlock}>
        <span>Search Profile: </span>
        <input 
          type="file" 
          accept="application/json" 
          onChange={ (e) => this.handleChange(e.target.files) }/>
      </div>
    );
  }
}
