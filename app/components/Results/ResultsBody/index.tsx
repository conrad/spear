import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../../reducers/results';
let Icons = require('react-feather');

let styles = require("./ResultsBody.scss");

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  toggleShowSearchResultRows(index: number): void,
  showResultOverlay(resultItemIndex: number, excerptIndex: number): void,  
};
  
export class ResultsBody extends React.Component<IProps> {
  createElementsFromResults(results: IResults): Array<JSX.Element> {
    let elements: Array<JSX.Element> = [];
    results.items.map((item, i) => {

      if (!item.show) {
        const element: JSX.Element = (
          <li 
            className={ styles.searchTitleRow } 
            key={ i }
            onClick={ this.handleClickSearchTitleRow.bind(this, i) }>
            <Icons.ChevronDown className={ styles.expandResult }/>
            <div className={ styles.searchItem }>
              { item.search }
            </div>
          </li>
        );
        elements.push(element);
        
      } else {
        const searchElement: JSX.Element = (
          <li 
            className={ styles.searchTitleRow }
            key={ i }
            onClick={ this.handleClickSearchTitleRow.bind(this, i) }>
            <Icons.ChevronUp className={ styles.expandResult }/>
            <div className={ styles.searchItem }>
              { item.search }
            </div>
          </li>
        );
        elements.push(searchElement);
        
        item.excerpts.map((excerpt, j) => {
          const resultElement: JSX.Element = (
            <li 
              className={ styles.excerptItem } 
              key={ i + j * .1 + .1 }
              onClick={ this.handleClickResultRow.bind(this, i, j) }>
              <span>{excerpt.text}</span>
              <span>{excerpt.index}</span>
            </li>
          );
          elements.push(resultElement);
        })
      }
    });
    return elements;
  }

  handleClickSearchTitleRow(resultIndex: number) {
    this.props.toggleShowSearchResultRows(resultIndex);
  }

  handleClickResultRow(resultIndex: number, excerptIndex: number) {
    this.props.showResultOverlay(resultIndex, excerptIndex);
  }

  render() {
    return (
      <div className={ styles.scrollingContainer }>
        <ul className={ styles.resultsList }>
          { this.props.results.hasRun && this.props.results.items.length < 1 ?
            <div className={ styles.noResults }>No results found for this search.</div> :
              this.createElementsFromResults(this.props.results).map(val => {
                return val;
              })
          }
        </ul>
      </div>
    );
  }
}
