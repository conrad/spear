import * as React from 'react';
import { FileInput } from './FileInput';
import { PhraseList } from './PhraseList';
import FileSearcher from '../../local/search/fileSearcher';
import IResults from '../../types/IResults';
import IResult from '../../types/IResult'
import { copyArray } from '../../utils/helpers';
import FileLoader from '../../local/search/fileLoader';
import ISearchesState from '../../types/ISearchesState';
import ISearch from '../../types/ISearch';

let Icons = require('react-feather');
let styles = require('./SearchForm.scss');

export interface IProps {
  searches: ISearchesState,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  addFile(file: File): void,
  resetFile(): void,
  setResults(results: IResults): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void
  setSearchAsUsed(searchIndex: number, isUsed: boolean|null): void,  
}

export class SearchForm extends React.Component<IProps> {
  handleClickSearch() {
    let searches: ISearchesState = {...this.props.searches}; 
    
    if (!searches.file) {
      this.props.resetFile();
      return;
    }
    
    let phrases: Array<string> = copyArray(searches.searches[searches.currentSearchIndex].phrases);

    if (searches.newPhrase 
      && searches.searches[searches.currentSearchIndex].phrases.indexOf(searches.newPhrase) == -1
    ) {
      phrases.push(searches.newPhrase);
    }

    const i: number = this.props.searches.currentSearchIndex;
    this.props.updateSearch({
      index: i,
      name: this.props.searches.searches[i].name,
      phrases: phrases,
      isIncluded: this.props.searches.searches[i].isIncluded,
      isEditing: false,
    });

    const fileSearcher: FileSearcher = new FileSearcher(new FileLoader())

    fileSearcher.search(searches.file, this.props.searches.searches)
      .then((items: IResult[]) => {
        console.log('items', items)
        const results: IResults = { 
          hasRun: true, 
          items,
          overlay: {
            show: false,
            search: '',
            phrase: '',
            body: '',
          }, 
          showWindow: true,
        }

        this.props.updateIsNewPhraseUsed(false);
        this.props.setResults(results);
      })
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
