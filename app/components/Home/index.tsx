import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm';
import { IResults } from '../../reducers/results';
import { Searches } from '../Searches';
import { SearchForm } from '../SearchForm';
import { Results } from '../Results';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  results: IResults,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void,
  setResults(results: IResults): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void
}

export class Home extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.columnsContainer}>
        <div className={styles.rowsContainer}>
          <Searches/>
          <SearchForm {...this.props}/>
        </div>
        { this.props.results.hasRun ?
          <Results {...this.props}/> :
          null
        }
      </div>
    );
  }
}
