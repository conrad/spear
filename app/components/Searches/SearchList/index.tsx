import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState, ISearch } from '../../../reducers/searches';
let Icons = require('react-feather');

let styles = require('./SearchList.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  addSearch(search: ISearch): void,
  selectSearch(index: number): void,
  removeSearch(index: number, name: string): void,
  setSearchAsUsed(index: number): void,
  updateNewSearchName(name: string): void,
}

interface IState extends RouteComponentProps<any> {
  searches: ISearchesState
}

export class SearchList extends React.Component<IProps, IState> {
  // componentDidMount() {
  //   this.setState({searches: {
  //     currentSearchIndex: 0,
  //     filename: '',
  //     isValidFile: true,
  //     searches: [],
  //     newSearchName: '',
  //     isNewSearchUsed: false,
  //     newPhrase: '',
  //     isNewPhraseUsed: false
  //   }});
  // }

  handleAddSearch() {
    if (this.props.searches.newSearchName) {
      this.props.addSearch({
        name: this.props.searches.newSearchName,
        index: this.props.searches.searches.length,
        phrases: [],
        isIncluded: false,
        isEditing: false,
      });
      this.props.updateNewSearchName('');
      // this.clearLastSearchInput();
    } else {
      console.log('You have to add a new search in order to add more!');
    }
  }

  handleRemoveSearch(index: number, name: string) {
    // this.props.deletePhrase(index);
  }

  createElementsFromSearches(searches: Array<ISearch>): Array<JSX.Element> {
    let elements: Array<JSX.Element> = [];
    searches.map((search, i) => {
      const icon: JSX.Element = search.isIncluded ? 
        <Icons.CheckCircle 
          className= { styles.searchCheckIcon }
          onClick= { this.props.setSearchAsUsed.bind(this, i) }/> : 
        <Icons.Circle
          className= { styles.searchCheckIcon }
          onClick= { this.props.setSearchAsUsed.bind(this, i) }/>;

      const element: JSX.Element = (
        <li 
          key={ i }
          className={ styles.searchListItem }
          onClick={ e => this.handleClickSearch(i) }>
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

  handleClickSearch(index: number) {
    this.props.selectSearch(index);
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
              value={ this.props.searches.newSearchName }/>
            <Icons.PlusCircle
              className={ styles.addSearchIcon }
              onClick={ this.handleAddSearch.bind(this) }/>
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
