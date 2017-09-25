import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResult } from '../../../reducers/results';
import { IFormState } from '../../../reducers/searchForm';

let styles = require("./ResultsHeader.scss");

export interface IProps extends RouteComponentProps<any> {
  results: Array<IResult>,
  searchForm: IFormState
}
 
export interface IState extends RouteComponentProps<any> {
  results: Array<IResult>,
  searchInfo: IFormState
}

export class ResultsHeader extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({
      results: this.props.results,
      searchInfo: this.props.searchForm 
    });  
  }

  componentWillReceiveProps(nextProps: IProps) {
    // Is this a deep enough check?
    if (this.props.results !== nextProps.results) {    
      // Does this need to be set separately for the initial render as well?
      this.setState({
        results: nextProps.results,
        searchInfo: nextProps.searchForm 
      });
    }
  }

  calculateResults(results: Array<IResult>): number {
    // return results.reduce((prev: IResult, cur: IResult, i: number, resArr: Array<IResult>) => {
    //   ...
    // });

    let number: number = 0;
    results.forEach(result => {
      console.log('result in results:', result);
      if (result.excerpts) {
        number += result.excerpts.length;
      }
    });

    return number;
  }

  render() {
    if (!this.state) {
      return <div></div>
    }

    const numberOfResults = this.calculateResults(this.state.results);
    const resultsText = numberOfResults === 1 ? "Result" : "Results"    
    return (
      <div className={ styles.resultsHeader }>
        <div className={ styles.resultsFile }>
          Search of: {this.state.searchInfo.filename}
        </div>
        <div className={ styles.resultsCount }>
          { numberOfResults + " " + resultsText }
        </div>
      </div>
    );
  }
}
