import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../../reducers/searchForm';

let styles = require('./FileInput.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addFile(phrase: string): void,
  resetFile(): void
}

export class FileInput extends React.Component<IProps> {
  handleChange(selectorFiles: FileList | null) {
    // TODO: Emit action that proper file has NOT been made available.
    console.log(selectorFiles);
    if (selectorFiles == null) {
      console.log('nope. need to submit a file.')
      return;
    }
    console.log(selectorFiles[0]);
    if (selectorFiles.length > 1) {
      console.log('uh. you can only search one file');
    }

    if (selectorFiles[0].type === 'text/plain'
      || selectorFiles[0].type === 'application/msword'
    ) {
      console.log('correct file type');
      this.props.addFile(selectorFiles[0].path);
    } else {
      console.log('incorrect file type');
      this.props.resetFile();
    }
  }

  render() {
    return (
      <div className={styles.inputBlock}>
        <span>File: </span>
        <input 
          type="file" 
          accept="application/msword, text/plain" 
          onChange={ (e) => this.handleChange(e.target.files) } 
        />
      </div>
    );
  }
}
