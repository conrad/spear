import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../../reducers/searchForm';
let Icons = require('react-feather');

let styles = require('./PhraseList.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addPhrase(text: string): void,
  deletePhrase(index: number): void,
  updateNewPhrase(text: string): void,
  updateIsNewPhraseUsed(isUsed: boolean): void
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
    if (this.state.entry) {
      let isAlreadyPhrase = false;
      this.props.searchForm.phrases.forEach(phrase => {
        if (this.state.entry == phrase) {
          console.log('The phrase is already registered in this search.');
          isAlreadyPhrase = true;
          this.props.updateIsNewPhraseUsed(true);
          return;
        }
      });
      
      if (!isAlreadyPhrase) {
        this.props.addPhrase(this.state.entry);
        this.props.updateIsNewPhraseUsed(false);
      }

      this.clearLastInput();
    } else {
      console.log('You have to add a new phrase in order to add more!');
    }
  }

  handleRemovePhrase(index: number) {
    this.props.deletePhrase(index);
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
    console.log('phrase length:', this.props.searchForm.phrases.length);
    return (
      <div>
        <div className={styles.phraseInputContainer}>
        {this.props.searchForm.phrases.map(
          (phrase: string, index: number) => {
            return (
              <div key={index}>
                <textarea className={styles.phraseInput} readOnly value={phrase}/>
                <Icons.MinusCircle className={styles.minus} onClick={this.handleRemovePhrase.bind(this, index)}/>
              </div>
            );
          }
        )}
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
        { this.props.searchForm.isNewPhraseUsed ? 
          <div className={ styles.phraseUsedWarning }>The phrase is already used in this search.</div> : null
        }
      </div>
    );
  }
}
