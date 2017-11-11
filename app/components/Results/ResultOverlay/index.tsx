import * as React from 'react';
import { IResults } from '../../../reducers/results';

let styles = require("./ResultOverlay.scss");

export interface IProps {
  results: IResults,
  hideResultOverlay(): void,
  // toggleShowResultOverlay(resultItemIndex: number, excerptIndex: number): void,
};
  
export class ResultOverlay extends React.Component<IProps> {
  handleBackgroundClick() {
    this.props.hideResultOverlay();
  }

  getPageWithHighlightTag(pageText: string, phrase: string): string {
    const re: RegExp = new RegExp(phrase, 'g');
    const replacement: string = "<span class='" + styles.highlightedPhrase + "'>" + phrase + "</span>";
    return pageText.replace(re, replacement);
  }

  render() {
    const { results } = this.props;
    const highlightedPage: string = this.getPageWithHighlightTag(
      results.overlay.body, 
      results.overlay.phrase
    );

    return (
      this.props.results.overlay.show ?
        <div 
          className={ styles.overlayMask}
          onClick={ this.handleBackgroundClick.bind(this)}> 
          <div className={ styles.overlay}>
            <div className={ styles.header }>
              <div className={ styles.headerSearch }>{ results.overlay.search }</div>
              <div className={ styles.headerPhrase }>{ results.overlay.phrase }</div>
            </div>
            <div dangerouslySetInnerHTML={{__html: highlightedPage}}></div>
          </div> 
        </div> : null
    );
  }
}