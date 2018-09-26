import * as React from 'react';
import { copyArray, createPhrase } from '../../../utils/helpers';
import ISearch from '../../../types/ISearch';
import ISearchesState from '../../../types/ISearchesState';
import IPhrase from '../../../types/IPhrase';
let Icons = require('react-feather');
let styles = require('./PhraseList.scss');

export interface IProps {
  searches: ISearchesState,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  updateNewPhrase(phrase: IPhrase): void,
  updateIsNewPhraseUsed(isUsed: boolean): void,
  setSearchAsUsed(searchIndex: number, isUsed: boolean|null): void,  
}

interface IState {
  entry: IPhrase
}

export class PhraseList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({entry: createPhrase()});
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const phrase: IPhrase = createPhrase(event.target.value)
    this.setState({entry: phrase})
    this.props.updateNewPhrase(phrase)
  }

  handleAddPhrase() {
    const currentIndex: number = this.props.searches.currentSearchIndex;
    const { searches }  = this.props.searches;
    if (this.state.entry) {
      let isAlreadyPhrase: boolean = false;
      searches[currentIndex].phrases.forEach((phrase: IPhrase) => {
        if (this.state.entry.text === phrase.text
          && this.state.entry.isCaseSensitive === phrase.isCaseSensitive
          && this.state.entry.isExactMatch === phrase.isExactMatch
        ) {
          console.log('The phrase is already registered in this search.');
          isAlreadyPhrase = true;
          this.props.updateIsNewPhraseUsed(true);
          return;
        }
      });
      
      if (!isAlreadyPhrase && this.state.entry.text) {
        let phrases: IPhrase[] = copyArray(searches[currentIndex].phrases);

        phrases.push(this.state.entry);

        this.props.updateSearch({
          index: currentIndex,
          name: searches[currentIndex].name,
          description: searches[currentIndex].description,
          phrases: phrases,
          isIncluded: searches[currentIndex].isIncluded,
          isEditing: searches[currentIndex].isEditing,
        });
        this.props.updateIsNewPhraseUsed(false);
        this.props.setSearchAsUsed(currentIndex, true);
        this.focusOnPhraseInput();
      }

    } else {
      console.log('You have to add a new phrase in order to add more!');
    }
  }

  focusOnPhraseInput() {
    let element = document.getElementById('lastPhraseInput')
    if (element) {
      element.focus();
    }
  }

  handleRemovePhrase(index: number) {
    this.props.deletePhrase(index, this.props.searches.currentSearchIndex);
  }

  handleTextAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) { 
    if (e.keyCode == 13) {
      this.handleAddPhrase();
      e.preventDefault();
    }

    this.textAreaAdjust();
  }

  textAreaAdjust() {
    let textarea = document.getElementById('lastPhraseInput');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight+'px';
    }
  }

  render() {
    const currentIndex: number = this.props.searches.currentSearchIndex;
    const currentSearch: ISearch = this.props.searches.searches[currentIndex]

    return (
      <div>
        <div className={styles.phraseInputContainer}>
        { currentSearch.phrases.map(
          (phrase: IPhrase, index: number) => {
            return (
              <div key={index}>
                <textarea className={styles.phraseInput} readOnly value={phrase.text}/>
                <p>hook these up:</p>
                <button>
                  {phrase.isCaseSensitive ? 'match case' : 'ignore case'}
                </button>
                <button>
                  {phrase.isExactMatch ? 'exact match' : 'near match'}
                </button>
                <Icons.MinusCircle 
                  className={ styles.minus } 
                  onClick={ this.handleRemovePhrase.bind(this, index) }/>
              </div>
            );
          }
        ) }
          <textarea 
            id="lastPhraseInput" 
            ref="lastPhraseInput"  
            className={ styles.phraseInput } 
            placeholder={ 'Add a new phrase' } 
            value={ this.props.searches.newPhrase.text } 
            onKeyDown={ e => this.handleTextAreaKeyDown(e) } 
            onChange={ e => this.handleInputChange(e) }>
          </textarea>
        </div>
        <span>TODO: Add exact match & case sensitive options here. </span>
        <Icons.PlusCircle 
          className={styles.plus}
          onClick={this.handleAddPhrase.bind(this)}
        />
        { this.props.searches.isNewPhraseUsed ? 
          <div className={ styles.phraseUsedWarning }>The phrase is already used in this search.</div> : null
        }
      </div>
    );
  }
}
