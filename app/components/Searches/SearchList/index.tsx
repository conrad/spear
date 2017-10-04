import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState, ISearch } from '../../../reducers/searches';
let Icons = require('react-feather');

let styles = require('./SearchList.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  addSearch(
    index: number, 
    name: string, 
    description: string|null, 
    phrases: Array<string>
  ): void,
  removeSearch(index: number, name: string): void,
  setSearchAsUsed(index: number): void,
  updateNewSearchName(name: string): void,
}

interface IState extends RouteComponentProps<any> {
  searches: ISearchesState
}

export class SearchList extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({searches: {
      currentSearchIndex: 0,
      filename: '',
      isValidFile: true,
      searches: [],
      newSearchName: '',
      isNewSearchUsed: false,
      newPhrase: '',
      isNewPhraseUsed: false
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
    if (this.state.searches) {
      console.log('Adding search: ', this.state.searches.searches);
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

  createElementsFromSearches(searches: Array<ISearch>): Array<JSX.Element> {
    let elements: Array<JSX.Element> = [];
    searches.map((search, i) => {
      const icon: JSX.Element = search.isIncluded ? 
        <Icons.Circle 
          className= { styles.searchCheckIcon }
          onClick= { this.props.setSearchAsUsed.bind(this, i) }/> : 
        <Icons.CheckCircle
          className= { styles.searchCheckIcon }
          onClick= { this.props.setSearchAsUsed.bind(this, i) }/>;

      const element: JSX.Element = (
        <li 
          key={ i }
          className={ styles.searchListItem }>
          { icon }
          <span className={ styles.searchName }>
            { searches[i].name }
          </span>
        </li>
      );
      elements.push(element);
    });

    return elements;
  }

  setSearchAsUsed(searchIndex: number) {
    console.log('use it or lose it');
    //onClick={ this.selectSearch(i)}
  }

  selectSearch(searchIndex: number) {
    console.log('select this search');
  }

  render() {
    console.log('searchList props:', this.props);
    const searches: ISearchesState = this.props.searches ? 
      this.props.searches : 
      {
        currentSearchIndex: 0,
        filename: '',
        isValidFile: true,
        searches: [],
        newSearchName: '',
        isNewSearchUsed: false,
        newPhrase: '',
        isNewPhraseUsed: false,
      };

    return (
      <div>
        <div className={styles.searchListContainer}>
          <ul className={ styles.searchList }>
            { this.createElementsFromSearches(searches.searches).map(val => { return val; }) }
            <textarea 
              className={ styles.searchInput }
              onChange={ e => this.props.updateNewSearchName(e.target.value) }
            />
            <Icons.FileText/>
          </ul>
        </div>
      </div>
    );
  }
}

      //   { searches.searches.map(
      //     (search: ISearch, index: number) => {
      //       return (
      //         <div key={index}>
      //           <textarea 
      //             className={styles.phraseInput} 
      //             readOnly 
      //             value={search.name}
      //           />
      //           <Icons.MinusCircle className={styles.minus} onClick={this.handleRemoveSearch.bind(this, index, search.name)}/>
      //         </div>
      //       );
      //     }
      //   )}
      //     <textarea 
      //       id="lastSearchNameInput" 
      //       className={styles.searchInput} 
      //       onKeyDown={e => this.textAreaAdjust(e)} 
      //       placeholder={'Create a new search'} 
      //       onChange={e => this.handleInputChange(e)}>
      //     </textarea>
      //   </div>
      //   <Icons.PlusCircle 
      //     className={styles.plus}
      //     onClick={this.handleAddSearch.bind(this)}
      //   />
      // </div>
