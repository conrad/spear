import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IResult } from '../../reducers/results';

let styles = require('./Results.scss');

export interface IProps extends RouteComponentProps<any> {
  results: Array<IResult>
}
  
export class Results extends React.Component<IProps> {
  render() {
    console.log('props in results', this.props);
    return (
      <div>
      { this.props.results.length > 0 ?
        <div className={styles.results}>This is the Results</div> :
        null
      }
      </div>
    );
  }
}
