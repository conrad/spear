import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../reducers/results';
import { ResultsHeader } from "./ResultsHeader";
import { ResultsBody } from "./ResultsBody";
import { IFormState } from '../../reducers/searchForm';

let styles = require('./Results.scss');

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searchForm: IFormState
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
