import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../../reducers/searchForm';
let Icons = require('react-feather');

let styles = require('./PhraseList.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void
}

interface IState extends RouteComponentProps<any> {
  entry: string
}

export class PhraseList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({entry: ''});
  }

  clearTextArea() {
    this.setState({entry: ''});
    (ReactDOM.findDOMNode(this.refs.lastPhraseInput) as HTMLTextAreaElement).value = '';
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    this.setState({entry: event.target.value});
  }

  handleAddPhrase(e: Event) {
    if (this.state.entry) {
      console.log('Adding phrase: ', this.state.entry);
      let isAlreadyPhrase = false;
      this.props.searchForm.phrases.forEach(phrase => {
        if (this.state.entry == phrase) {
          console.log('This phrase is already registered.');
          isAlreadyPhrase = true;
          return;
        }
      });
      if (!isAlreadyPhrase) {
        this.props.addPhrase(this.state.entry);
      }

      this.clearTextArea();
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
    return (
      <div>
        <div className={styles.lastInputContainer}>
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
          <textarea id="lastPhraseInput" ref="lastPhraseInput" className={styles.phraseInput} onKeyDown={e => this.textAreaAdjust(e)} placeholder={'Add a new phrase'} onChange={e => this.handleInputChange(e)}></textarea>
        </div>
        <Icons.PlusCircle 
          className={styles.plus}
          onClick={this.handleAddPhrase.bind(this)}
        />
      </div>
    );
  }
}
