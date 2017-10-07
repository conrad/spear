import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MenuBanner } from './MenuBanner';
import { SearchList } from './SearchList';
import { IMenu } from '../../reducers/menu';
let styles = require('./Searches.scss');

export interface IProps extends RouteComponentProps<any> {
  menu: IMenu,
  toggleMenuDropDown(): void,
}

export class Searches extends React.Component<any> {
  render() {
    console.log('props in searches', this.props);
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