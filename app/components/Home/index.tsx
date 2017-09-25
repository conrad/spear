import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm';
import { IResult } from '../../reducers/results';
import { Searches } from '../Searches';
import { SearchForm } from '../SearchForm';
import { Results } from '../Results';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  results: Array<IResult>,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void,
  setResults(results: Array<IResult>): void
}

export class Home extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.columnsContainer}>
        <div className={styles.rowsContainer}>
          <Searches/>
          <SearchForm {...this.props}/>
        </div>
        { this.props.results.length > 0 ?
          <Results {...this.props}/> :
          null
        }
      </div>
    );
  }
}
