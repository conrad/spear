import * as React from 'react';
import { ISearchesState, ISearch } from '../../../reducers/searches';
import { copyArray } from '../../../utils/helpers';
let Icons = require('react-feather');
let styles = require('./PhraseList.scss');

export interface IProps {
  searches: ISearchesState,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void,
  setSearchAsUsed(searchIndex: number, isUsed: boolean|null): void,  
}

interface IState {
  entry: string
}

export class PhraseList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({entry: ''});
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    this.setState({entry: event.target.value});
    this.props.updateNewPhrase(event.target.value);
  }

  handleAddPhrase() {
    const currentIndex: number = this.props.searches.currentSearchIndex;
    const { searches }  = this.props.searches;
    if (this.state.entry) {
      let isAlreadyPhrase = false;
      searches[currentIndex].phrases.forEach(phrase => {
        if (this.state.entry == phrase) {
          console.log('The phrase is already registered in this search.');
          isAlreadyPhrase = true;
          this.props.updateIsNewPhraseUsed(true);
          return;
        }
      });
      
      if (!isAlreadyPhrase) {
        let phrases: Array<string> = copyArray(searches[currentIndex].phrases);

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
          (phrase: string, index: number) => {
            return (
              <div key={index}>
                <textarea className={styles.phraseInput} readOnly value={phrase}/>
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
            value={ this.props.searches.newPhrase } 
            onKeyDown={ e => this.handleTextAreaKeyDown(e) } 
            onChange={ e => this.handleInputChange(e) }>
          </textarea>
        </div>
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
