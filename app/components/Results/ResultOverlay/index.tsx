import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../../reducers/results';

let styles = require("./ResultOverlay.scss");

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  hideResultOverlay(): void,
  // toggleShowResultOverlay(resultItemIndex: number, excerptIndex: number): void,
};
  
export class ResultOverlay extends React.Component<IProps> {
  handleBackgroundClick() {
    this.props.hideResultOverlay();
  }

  render() {
    return (
      this.props.results.overlay.show ?
        <div 
          className={ styles.overlayMask}
          onClick={ this.handleBackgroundClick.bind(this)}> 
          <div className={ styles.overlay}>
            <div>{ this.props.results.overlay.search }</div>
            <div>{ this.props.results.overlay.phrase }</div>
            <div>{ this.props.results.overlay.body }</div>
          </div> 
        </div> : null
    );
  }
}