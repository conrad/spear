import * as React from 'react';
import IResults from '../../types/IResults';
import { ResultsHeader } from "./ResultsHeader";
import { ResultsBody } from "./ResultsBody";
import ISearchesState from '../../types/ISearchesState';

let styles = require('./Results.scss');

export interface IProps {
  results: IResults,
  searches: ISearchesState,
  toggleShowResultsWindow(): void,
  toggleShowSearchResultRows(index: number): void,
  showResultOverlay(resultItemIndex: number, excerptIndex: number): void,
  saveResultsToFile(): void,
}
  
export class Results extends React.Component<IProps> {
  render() {
    return (
        <div className={styles.results}>
          <ResultsHeader {...this.props}/>
          { this.props.results.showWindow ? 
            <ResultsBody {...this.props}/> : 
            null
          }
        </div>
    );
  }
}
