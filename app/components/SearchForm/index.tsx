import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState, ISearch } from '../../reducers/searches';
import { FileInput } from './FileInput';
import { PhraseList } from './PhraseList';
import { search as runSearch } from '../../local/fileSearcher';
import { IResults } from '../../reducers/results';
import { copyArray } from '../../utils/helpers';

let Icons = require('react-feather');
let styles = require('./SearchForm.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  addFile(filename: string): void,
  resetFile(): void,
  setResults(results: IResults): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void
}

export class SearchForm extends React.Component<IProps> {
  handleClickSearch() {
    let searches: ISearchesState = {...this.props.searches}; 
    
    if (!searches.filename) {
      this.props.resetFile();
      return;
    }
    
    let phrases: Array<string> = copyArray(searches.searches[searches.currentSearchIndex].phrases);

    if (searches.newPhrase 
      && searches.searches[searches.currentSearchIndex].phrases.indexOf(searches.newPhrase) == -1
    ) {
      phrases.push(searches.newPhrase);
    }

    const results: IResults = { 
      hasRun: true, 
      items: runSearch(searches.filename, phrases)
    };

    this.props.updateIsNewPhraseUsed(false);
    this.props.setResults(results);
  }

  render() {
    return (
      <div className={ styles.formColumn }>
        <div className={ styles.formHeader }>
          <FileInput { ...this.props }/>
          <Icons.Search 
            className={ styles.searchIcon }
            onClick={ this.handleClickSearch.bind(this) }
          />
        </div>
        <div className={ styles.formBody }>
          <div className={ styles.formTitle }>Phrases</div>
          <PhraseList { ...this.props }/>
        </div>
      </div>
    );
  }
}
