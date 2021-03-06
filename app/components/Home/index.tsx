import * as React from 'react';
import IResults from '../../types/IResults';
import { IMenu } from '../../reducers/menu';
import { Searches } from '../Searches';
import { SearchForm } from '../SearchForm';
import { Results } from '../Results';
import { ResultOverlay } from '../Results/ResultOverlay';
import ISearchesState from '../../types/ISearchesState';
import ISearch from '../../types/ISearch';
import IPhrase from '../../types/IPhrase';

let styles = require('./Home.scss');

export interface IProps {
  results: IResults,
  searches: ISearchesState,
  menu: IMenu,
  addFile(file: File): void,
  addSearch(search: ISearch): void,
  addSearchesFromProfile(file: File): void,  
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  exportSearches(): void, 
  hideResultOverlay(): void,
  removeSearch(index: number, name: string): void,
  resetFile(): void,
  saveResultsToFile(): void,
  showResultOverlay(resultItemIndex: number, excerptIndex: number): void,
  selectSearch(index: number): void,
  setResults(results: IResults): void,
  setSearchAsUsed(searchIndex: number, isUsed: boolean|null): void,    
  toggleMenuDropDown(): void,
  toggleShowResultsWindow(): void,
  toggleShowSearchResultRows(index: number): void,
  updateIsNewPhraseUsed(isUsed: boolean): void,
  updateNewPhrase(phrase: IPhrase): void,
  updateSearch(search: ISearch): void,
  updateNewSearchName(name: string): void,
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
