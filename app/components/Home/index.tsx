import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm';
// import { submitSearch, addPhrase, deletePhrase, addFile, resetFile } from '../../actions/searchForm';
import { Searches } from '../Searches';
import { SearchForm } from '../SearchForm';
import { Results } from '../Results';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void
}

export class Home extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.container}>
        <Searches/>
        <SearchForm {...this.props} />
        <Results/>
      </div>
    );
  }
}
