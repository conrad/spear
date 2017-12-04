import * as React from 'react';
import { MenuBanner } from './MenuBanner';
import { SearchList } from './SearchList';
import { IMenu } from '../../reducers/menu';
import { ISearchesState, ISearch } from '../../reducers/searches';
let styles = require('./Searches.scss');

export interface IProps {
  menu: IMenu,
  searches: ISearchesState,
  addSearchesFromProfile(file: File): void,
  exportSearches(): void,
  addSearch(search: ISearch): void,
  selectSearch(index: number): void,
  setSearchAsUsed(searchIndex: number, isUsed: boolean|null): void,  
  toggleMenuDropDown(): void,
  updateNewSearchName(name: string): void,
  removeSearch(index: number, name: string): void,
}


export class Searches extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.searchesColumn}>
        <MenuBanner {...this.props}/>
        <div className={styles.searchesBody}>
          <div className={styles.searchesTitle}>Searches</div>
          <SearchList {...this.props}/>
        </div>
      </div>
    );
  }
}