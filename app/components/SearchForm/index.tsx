import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm';
import { FileInput } from './FileInput';
import { PhraseList } from './PhraseList';

let styles = require('./SearchForm.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void,
  startAddingPhrase(): void
}

export class SearchForm extends React.Component<IProps> {
  handleAddPhrase(e: Event) {
    console.log('Adding phrase: ', e.target);
    this.props.addPhrase('come on');
  }

  render() {
    return (
      <div className={styles.formColumn}>
        <div className={styles.formHeader}>
          <FileInput filename={this.props.searchForm.filename}/>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formTitle}>Phrases</div>
          <PhraseList {...this.props}/>
        </div>
      </div>
    );
  }
}
