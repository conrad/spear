import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../../reducers/results';

let styles = require("./ResultsBody.scss");

export interface IProps extends RouteComponentProps<any> {
  results: IResults
}
  
export class ResultsBody extends React.Component<IProps> {

  createElementsFromResults(results: IResults): Array<JSX.Element> {
    let elements: Array<JSX.Element> = [];
    results.items.map((item, i) => {
      item.excerpts.map((excerpt, j) => {
        const element: JSX.Element = (
          <li className={styles.excerptItem} key={i + j * .1}>
            <span>{excerpt.text}</span>
            <span>{excerpt.index}</span>
          </li>
        );
        elements.push(element);
      })
    });
    return elements;
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
