import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm';
import { FileInput } from './FileInput';
import { PhraseList } from './PhraseList';
import { search as runSearch } from '../../local/fileSearcher';
import { IResult } from '../../reducers/results';
import { copyArray } from '../../utils/helpers';

let Icons = require('react-feather');
let styles = require('./SearchForm.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void,
  setResults(results: Array<IResult>): void,
  updateNewPhrase(text: string): void
}

export class SearchForm extends React.Component<IProps> {
  handleAddPhrase(e: Event) {
    this.props.addPhrase('come on');
  }

  handleClickSearch() {
    let searchForm: IFormState = {...this.props.searchForm}; 
    let phrases: Array<string> = copyArray(searchForm.phrases);

    if (searchForm.newPhrase && searchForm.phrases.indexOf(searchForm.newPhrase) == -1) {
      phrases.push(searchForm.newPhrase);
    }

    const results: Array<IResult> = runSearch(searchForm.filename, phrases);

    this.props.setResults(results);
  }

  render() {
    return (
      <div className={styles.formColumn}>
        <div className={styles.formHeader}>
          <FileInput {...this.props}/>
          <Icons.Search 
            className={styles.searchIcon}
            onClick={this.handleClickSearch.bind(this)}
          />
        </div>
        <div className={styles.formBody}>
          <div className={styles.formTitle}>Phrases</div>
          <PhraseList {...this.props}/>
        </div>
      </div>
    );
  }
}
