import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResults } from '../../reducers/results';
import { ResultsHeader } from "./ResultsHeader";
import { ResultsBody } from "./ResultsBody";
import { IFormState } from '../../reducers/searchForm';

let Icons = require('react-feather');
let styles = require('./Results.scss');

export interface IProps extends RouteComponentProps<any> {
  results: IResults,
  searchForm: IFormState
}
  
export class Results extends React.Component<IProps> {
  handleClickExport() {
    console.log('wanna save your results?');
  }

  render() {
    return (
      <div className={styles.results}>
        <ResultsHeader {...this.props}/>
        <ResultsBody {...this.props}/>
        <Icons.File 
        className={ styles.exportButton }
        onClick={ this.handleClickExport.bind(this) }/>
      </div>
    );
  }
}
