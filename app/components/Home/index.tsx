import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../reducers/results';
import { ISearchesState, ISearch } from '../../reducers/searches';
import { IMenu } from '../../reducers/menu';
import { Searches } from '../Searches';
import { SearchForm } from '../SearchForm';
import { Results } from '../Results';
import { ResultOverlay } from '../Results/ResultOverlay';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searches: ISearchesState,
  menu: IMenu,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  addFile(file: File): void,
  resetFile(): void,
  setResults(results: IResults): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void,
  exportSearches(): void, 
  addSearchesFromProfile(file: File): void,  
  toggleShowSearchResultRows(index: number): void,
  showResultOverlay(resultItemIndex: number, excerptIndex: number): void,
  hideResultOverlay(): void,
  saveResultsToFile(): void,
  updateCategory(category: string): void,
};

export class Home extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.columnsContainer}>
        <ResultOverlay {...this.props}/>
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
