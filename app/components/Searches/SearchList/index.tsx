import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../../reducers/searchForm';
import { ISearch } from '../../../reducers/searches';
let Icons = require('react-feather');

let styles = require('./SearchList.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: Array<ISearch>,
  searchForm: IFormState,
  addSearch(phrase: string): void,
  deleteSearch(index: number): void,
  setPhrases(phrases: Array<string>): void,
}

interface IState extends RouteComponentProps<any> {
  searches: Array<ISearch>
}

export class SearchList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({searches: []});
  }

  clearTextArea() {
    this.setState({searches: []}); //TODO: Not right. Fix this.
    let textarea: any = document.getElementById('lastSearchNameInput');
    if (textarea) {
      textarea.value = '';
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    // this.setState({value: event.target.value});
  }

  handleAddSearch(e: Event) {
    if (this.state.searches) {
      console.log('Adding phrase: ', this.state.searches);
      // let isAlreadyPhrase = false;
      // this.props.searchForm.phrases.forEach(phrase => {
        // TODO: Fix. None of this logic around state is correct yet.
      //   if (this.state.searches[0].name == phrase) {    
      //     console.log('This phrase is already registered.');
      //     isAlreadyPhrase = true;
      //     return;
      //   }
      // });

      this.clearTextArea();
    } else {
      console.log('You have to add a new phrase in order to add more!');
    }
  }

  handleRemovePhrase(index: number) {
    // this.props.deletePhrase(index);
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
        {/* {this.props.searchForm.phrases.map(
          (phrase: string, index: number) => {
            return (
              <div key={index}>
                <textarea className={styles.phraseInput} readOnly value={phrase}/>
                <Icons.MinusCircle className={styles.minus} onClick={this.handleRemovePhrase.bind(this, index)}/>
              </div>
            );
          }
        )} */}
          <textarea 
            id="lastSearchNameInput" 
            className={styles.searchInput} 
            onKeyDown={e => this.textAreaAdjust(e)} 
            placeholder={'Create a new search'} 
            onChange={e => this.handleInputChange(e)}>
          </textarea>
        </div>
        <Icons.PlusCircle 
          className={styles.plus}
          onClick={this.handleAddSearch.bind(this)}
        />
      </div>
    );
  }
}
