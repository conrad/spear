import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState, ISearch } from '../../../reducers/searches';
import { isObjectInArray } from '../../../utils/helpers';
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
  handleAddSearch() {
    if (this.props.searches.newSearchName) {
      if (!isObjectInArray(
        this.props.searches.searches, 
        this.props.searches.newSearchName, 
        "name")
      ) {
        this.props.addSearch({
          name: this.props.searches.newSearchName,
          index: this.props.searches.searches.length,
          phrases: [],
          isIncluded: false,
          isEditing: false,
        });
      }

      this.props.updateNewSearchName('');
      this.props.selectSearch(this.props.searches.searches.length - 1)
    } else {
      console.log('You have to name a new search in order to add it.');
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
          className={ this.getItemClassNames(i, this.props.searches.currentSearchIndex) }
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

  getItemClassNames(index: number, selectedIndex: number): string {
    if (index === selectedIndex) {
      return styles.searchListItem + ' ' + styles.searchListItemSelected;
    }

    return styles.searchListItem
  }

  handleClickSearch(index: number) {
    this.props.selectSearch(index);
  }

  handleTextAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) { 
    if (e.keyCode == 13) {
      this.handleAddSearch();
      e.preventDefault();
    }
  }

  selectSearch(searchIndex: number) {
    console.log('select this search');
  }

  render() {
    const searches: ISearchesState = this.props.searches ? 
      this.props.searches : 
      {
        currentSearchIndex: 0,
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
              onKeyDown={ e => this.handleTextAreaKeyDown(e) }
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
