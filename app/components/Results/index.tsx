import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../reducers/results';
import { ResultsHeader } from "./ResultsHeader";
import { ResultsBody } from "./ResultsBody";
import { ISearchesState } from '../../reducers/searches';

let styles = require('./Results.scss');

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searches: ISearchesState
}
  
export class Results extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.results}>
        <ResultsHeader {...this.props}/>
        <ResultsBody {...this.props}/>
      </div>
    );
  }
}
