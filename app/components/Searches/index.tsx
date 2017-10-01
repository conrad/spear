import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// import { ISearches } from '../../reducers/searches';
import { MenuBanner } from './MenuBanner';
import { SearchList } from './SearchList';

let styles = require('./Searches.scss');

export interface IProps extends RouteComponentProps<any> {
  // searches: IFormState
}

export class Searches extends React.Component<any> {
  render() {
    console.log('seraches props', this.props);
    return (
      <div className={styles.searchesColumn}>
        <MenuBanner/>
        <div className={styles.searchesBody}>
          <div className={styles.searchesTitle}>Searches</div>
          <SearchList {...this.props}/>
        </div>
      </div>
    );
  }
}