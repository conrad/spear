import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState } from '../../../reducers/searches';

let styles = require('./CategoryInput.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  updateCategory(category: string): void,
}

export class CategoryInput extends React.Component<IProps> {
  render() {
    const { searches } = this.props;
    return (
      <div className={ styles.categoryInputContainer }>
        <span>Category (optional): </span>
        <input 
          type="text"
          className={ styles.categoryInput }
          onChange={ e => this.props.updateCategory(e.target.value) }
          value={searches.searches[searches.currentSearchIndex].category }/>
      </div>
    );
  }
}

{/* </input> */}
// {onKeyDown={ e => this.handleTextAreaKeyDown(e) }}
