import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IMenu } from '../../../reducers/menu';

let Icons = require('react-feather');
let styles = require('./MenuBanner.scss');

export interface IProps extends RouteComponentProps<any> {
  toggleMenuDropDown(): void,
  menu: IMenu,
};

export class MenuBanner extends React.Component<IProps> {
  createMenu(): JSX.Element {
    if (!this.props.menu.show) {
      return (
        <span>
          <Icons.ChevronDown onClick={ this.handleClickMenuToggle.bind(this) }/>
        </span>
      );
    }

    return (
      <div>
        <Icons.ChevronUp onClick={ this.handleClickMenuToggle.bind(this) }/>
        <div className={ styles.menuDropDown }> 
          soemthing for the menu
        </div>
      </div>
    );
  };

  handleClickMenuToggle() {
    this.props.toggleMenuDropDown()
  };

  render() {
    return (
      <div className={styles.banner}>
        <span>Spear</span>
        { this.createMenu() }
      </div>
    );
  }
}
