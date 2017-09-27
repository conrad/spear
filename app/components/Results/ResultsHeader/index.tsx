import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults, IResult } from '../../../reducers/results';
import { IFormState } from '../../../reducers/searchForm';

let styles = require("./ResultsHeader.scss");

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searchForm: IFormState
}
 
export interface IState extends RouteComponentProps<any> {
  results: IResults,
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

  calculateResults(resultItems: Array<IResult>): number {
    // return results.reduce((prev: IResult, cur: IResult, i: number, resArr: Array<IResult>) => {
    //   ...
    // });

    let number: number = 0;
    resultItems.forEach(item => {
      console.log('result in results:', item);
      if (item.excerpts) {
        number += item.excerpts.length;
      }
    });

    return number;
  }

  render() {
    if (!this.state) {
      return <div></div>
    }

    const numberOfResults = this.calculateResults(this.state.results.items);
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
