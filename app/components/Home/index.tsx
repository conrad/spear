import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../reducers/results';
import { ISearchesState, ISearch } from '../../reducers/searches';
import { IMenu } from '../../reducers/menu';
import { Searches } from '../Searches';
import { SearchForm } from '../SearchForm';
import { Results } from '../Results';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searches: ISearchesState,
  menu: IMenu,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  addFile(filename: string): void,
  resetFile(): void,
  setResults(results: IResults): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void,
  exportSearches(): void, 
  addSearchesFromProfile(file: File): void,  
  toggleShowSearchResult(index: number): void,
};

export class Home extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.columnsContainer}>
        <div className={styles.rowsContainer}>
          <Searches {...this.props}/>
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
