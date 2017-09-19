import * as React from 'react';
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
  value: string
}

export class PhraseList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({value: ''});
  }

  clearTextArea() {
    this.setState({value: ''});
    let textarea: any = document.getElementById('lastInput');
    if (textarea) {
      textarea.value = '';
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    this.setState({value: event.target.value});
  }

  handleAddPhrase(e: Event) {
    if (this.state.value) {
      console.log('Adding phrase: ', this.state.value);
      this.props.addPhrase(this.state.value);
      this.clearTextArea();
    } else {
      console.log('You have to add a new phrase in order to add more!');
    }
  }

  handleRemovePhrase(index: number) {
    this.props.deletePhrase(index);
  }

  textAreaAdjust(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    let textarea = document.getElementById('lastInput');
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
          <textarea id="lastInput" className={styles.phraseInput} onKeyDown={e => this.textAreaAdjust(e)} placeholder={'Add a new phrase'} onChange={e => this.handleInputChange(e)}></textarea>
        </div>
        <Icons.PlusCircle 
          className={styles.plus}
          onClick={this.handleAddPhrase.bind(this)}
        />
      </div>
    );
  }
}
