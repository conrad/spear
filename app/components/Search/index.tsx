import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm'

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  increment(): void,
  incrementIfOdd(): void,
  incrementAsync(): void,
  decrement(): void,
  counter: number
}

export class Search extends React.Component<IProps> {
  render() {
    return (
      <div></div>
    );
  }
}
