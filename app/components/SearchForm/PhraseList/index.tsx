import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { ISearchesState, ISearch } from '../../../reducers/searches';
import { copyArray } from '../../../utils/helpers';
let Icons = require('react-feather');
let styles = require('./PhraseList.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  updateSearch(search: ISearch): void,
  deletePhrase(phraseIndex: number, searchIndex: number): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void,
}

interface IState extends RouteComponentProps<any> {
  entry: string
}

export class PhraseList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({entry: ''});
  }

  clearLastInput() {
    this.setState({entry: ''});
    (ReactDOM.findDOMNode(this.refs.lastPhraseInput) as HTMLTextAreaElement).value = '';
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    this.setState({entry: event.target.value});
    this.props.updateNewPhrase(event.target.value)
  }

  handleAddPhrase(e: Event) {
    const currentIndex: number = this.props.searches.currentSearchIndex;
    if (this.state.entry) {
      let isAlreadyPhrase = false;
      this.props.searches.searches[currentIndex].phrases.forEach(phrase => {
        if (this.state.entry == phrase) {
          console.log('The phrase is already registered in this search.');
          isAlreadyPhrase = true;
          this.props.updateIsNewPhraseUsed(true);
          return;
        }
      });
      
      if (!isAlreadyPhrase) {
        let phrases: Array<string> = copyArray(this.props.searches.searches[currentIndex].phrases);

        phrases.push(this.state.entry);

        this.props.updateSearch({
          index: currentIndex,
          name: this.props.searches.searches[currentIndex].name,
          description: this.props.searches.searches[currentIndex].description,
          phrases: phrases,
          isIncluded: this.props.searches.searches[currentIndex].isIncluded,
          isEditing: this.props.searches.searches[currentIndex].isEditing,
        });
        this.props.updateIsNewPhraseUsed(false);
      }

      this.clearLastInput();
    } else {
      console.log('You have to add a new phrase in order to add more!');
    }
  }

  handleRemovePhrase(index: number) {
    this.props.deletePhrase(index, this.props.searches.currentSearchIndex);
  }

  textAreaAdjust(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    let textarea = document.getElementById('lastPhraseInput');
    // let textarea = ReactDOM.findDOMNode(this.refs.lastPhraseInput);
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
            className={styles.phraseInput} 
            placeholder={'Add a new phrase'} 
            onKeyDown={e => this.textAreaAdjust(e)} 
            onChange={e => this.handleInputChange(e)}>
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
