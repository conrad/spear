import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResult } from '../../../reducers/results';

let styles = require("./ResultsBody.scss");

export interface IProps extends RouteComponentProps<any> {
  results: Array<IResult>
}
  
export class ResultsBody extends React.Component<IProps> {

  createElementsFromResults(results: Array<IResult>): Array<JSX.Element> {
    let elements: Array<JSX.Element> = [];
    results.map((result, i) => {
      console.log('Found a value to add to an element.', i);
      result.excerpts.map((excerpt, j) => {
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
      <div>
        <ul className={ styles.resultsList}>
          { 
            this.createElementsFromResults(this.props.results).map(val => {
              return val;
            }) 
          }
        </ul>
      </div>
    );
  }
}
