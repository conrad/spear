import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState } from '../../../reducers/searches';

let styles = require('./FileInput.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  addFile(phrase: string): void,
  resetFile(): void
}

export class FileInput extends React.Component<IProps> {
  handleChange(selectorFiles: FileList | null) {
    if (selectorFiles == null) {
      console.log('nope. need to submit a file.')
      this.props.resetFile();
      return;
    }
    console.log(selectorFiles[0]);
    if (selectorFiles.length > 1) {  // TODO: Enable multifile search someday.
      this.props.resetFile();
      return;
    }

    if (selectorFiles[0].type === 'text/plain'
      || selectorFiles[0].type === 'application/msword'
    ) {
      this.props.addFile(selectorFiles[0].path);
    } else {
      console.log('incorrect file type');
      this.props.resetFile();
    }
  }

  render() {
    return (
      <div className={styles.inputBlock}>
        <span>File to Search: </span>
        <input 
          type="file" 
          accept="application/msword, text/plain" 
          onChange={ (e) => this.handleChange(e.target.files) } 
        />
        { !this.props.searches.isValidFile ?
          <span className={ styles.fileWarning }>Must provide a text file</span> : 
          null
        }
      </div>
    );
  }
}
