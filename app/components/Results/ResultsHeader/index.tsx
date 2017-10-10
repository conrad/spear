import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults, IResult } from '../../../reducers/results';
import { ISearchesState } from '../../../reducers/searches';

let Icons = require('react-feather');
let styles = require("./ResultsHeader.scss");

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searches: ISearchesState
}
 
export interface IState extends RouteComponentProps<any> {
  results: IResults,
  searchInfo: ISearchesState
}

export class ResultsHeader extends React.Component<IProps, IState> {
  componentDidMount() {
    this.setState({
      results: this.props.results,
      searchInfo: this.props.searches
    });  
  }

  componentWillReceiveProps(nextProps: IProps) {
    // Is this a deep enough check?
    if (this.props.results !== nextProps.results) {    
      // Does this need to be set separately for the initial render as well?
      this.setState({
        results: nextProps.results,
        searchInfo: nextProps.searches
      });
    }
  }

  calculateResults(resultItems: Array<IResult>): number {
    // return results.reduce((prev: IResult, cur: IResult, i: number, resArr: Array<IResult>) => {
    //   ...
    // });

    let number: number = 0;
    resultItems.forEach(item => {
      if (item.excerpts) {
        number += item.excerpts.length;
      }
    });

    return number;
  }

  handleClickExport() {
    console.log('wanna save your results?');
  }

  handleClickClose() {
    console.log('wanna close results?');
  }

  render() {
    if (!this.state) {
      return <div></div>
    }

    const numberOfResults = this.calculateResults(this.state.results.items);
    const resultsText = numberOfResults === 1 ? "Result" : "Results"    
    return (
      <div className={ styles.resultsHeader }>
        <div>
          <Icons.File 
            className={ styles.exportButton }
            onClick={ this.handleClickExport.bind(this) }/>
          <Icons.ChevronDown
            className={ styles.downButton }
            onClick={ this.handleClickClose.bind(this) }/>
        </div>
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
