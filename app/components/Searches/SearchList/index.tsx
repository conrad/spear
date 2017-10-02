import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../../reducers/searchForm';
import { ISearchesState, ISearch } from '../../../reducers/searches';
let Icons = require('react-feather');

let styles = require('./SearchList.scss');

export interface IProps extends RouteComponentProps<any> {
  searchesList: ISearchesState,
  addSearch(
    index: number, 
    name: string, 
    description: string|null, 
    phrases: Array<string>
  ): void,
  removeSearch(index: number, name: string): void,
  searchForm: IFormState,
}

interface IState extends RouteComponentProps<any> {
  searchesList: ISearchesState
}

export class SearchList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({searches: {
      searches: [],
      newSearch: null,
      isNewSearchUsed: false,
    }});
  }

  clearLastSearchInput() {
    // this.setState({searches: []}); //TODO: Not right. Fix this.
    let textarea: any = document.getElementById('lastSearchNameInput');
    if (textarea) {
      textarea.value = '';
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    // this.setState({value: event.target.value});
  }

  handleAddSearch(e: Event) {
    if (this.state.searchesList) {
      console.log('Adding search: ', this.state.searchesList.searches);
      // let isAlreadyPhrase = false;
      // this.props.searchForm.phrases.forEach(phrase => {
        // TODO: Fix. None of this logic around state is correct yet.
      //   if (this.state.searches[0].name == phrase) {    
      //     console.log('This phrase is already registered.');
      //     isAlreadyPhrase = true;
      //     return;
      //   }
      // });

      this.clearLastSearchInput();
    } else {
      console.log('You have to add a new search in order to add more!');
    }
  }

  handleRemoveSearch(index: number, name: string) {
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
    console.log('searchList props:', this.props);
    const searches: ISearchesState = this.props.searchesList ? 
      this.props.searchesList : 
      {
        filename: '',
        isValidFile: true,
        searches: [],
        newSearch: null,
        isNewSearchUsed: false,
        newPhrase: '',
        isNewPhraseUsed: false,
      };

    return (
      <div>
        <div className={styles.searchListContainer}>
        { searches.searches.map(
          (search: ISearch, index: number) => {
            return (
              <div key={index}>
                <textarea 
                  className={styles.phraseInput} 
                  readOnly 
                  value={search.name}
                />
                <Icons.MinusCircle className={styles.minus} onClick={this.handleRemoveSearch.bind(this, index, search.name)}/>
              </div>
            );
          }
        )}
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
