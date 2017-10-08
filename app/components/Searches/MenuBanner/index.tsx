import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IMenu } from '../../../reducers/menu';
import { ISearch } from '../../../reducers/searches';
import { ProfileInput } from './ProfileInput';

let Icons = require('react-feather');
let styles = require('./MenuBanner.scss');

export interface IProps extends RouteComponentProps<any> {
  toggleMenuDropDown(): void,
  addSearchesFromProfile(searches: Array<ISearch>): void,
  menu: IMenu,
};

export class MenuBanner extends React.Component<IProps> {
  createMenu(): JSX.Element {
    if (!this.props.menu.show) {
      return (
        <span className={ styles.menuChevronIconContainer }>
          <Icons.ChevronDown 
            className={ styles.menuChevronIcon }
            onClick={ this.handleClickMenuToggle.bind(this) }/>
        </span>
      );
    }

    return (
      <span className={ styles.menuChevronIconContainer }>
        <Icons.ChevronUp 
          className={ styles.menuChevronIcon }
          onClick={ this.handleClickMenuToggle.bind(this) }/>
        <div className={ styles.menuDropDown }> 
          <div className={ styles.menuItem }>
            <span>Import searches from file</span>
            <ProfileInput { ...this.props }/>
          </div>
          <div className={ styles.menuItem }>item 2 a little longer</div>
          <div className={ styles.menuItem }>and one more for now</div>
        </div>
      </span>
    );
  };

  handleClickMenuToggle() {
    this.props.toggleMenuDropDown()
  };

  render() {
    return (
      <div className={ styles.banner }>
        <span className={ styles.title }>Spear</span>
        { this.createMenu() }
      </div>
    );
  }
}
