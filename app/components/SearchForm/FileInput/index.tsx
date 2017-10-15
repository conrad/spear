import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISearchesState } from '../../../reducers/searches';

let styles = require('./FileInput.scss');

export interface IProps extends RouteComponentProps<any> {
  searches: ISearchesState,
  addFile(file: File): void,
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
      || selectorFiles[0].type === 'application/pdf'
    ) {
      this.props.addFile(selectorFiles[0]);
    } else {
      console.log('incorrect file type');
      this.props.resetFile();
    }
  }

  render() {
    return (
      <div className={styles.inputBlock}>
        <input 
          type="file" 
          name="file" 
          id="file" 
          accept="application/msword, text/plain, application/pdf" 
          onChange={ (e) => this.handleChange(e.target.files) } 
          className={ styles.input }/>
        <label htmlFor="file">Choose a File to Search</label>
        { this.props.searches.file ? 
          <span className={ styles.filename }>
            { this.props.searches.file.name }
          </span> : null }
        { !this.props.searches.isValidFile ?
          <span className={ styles.fileWarning }>Must provide a text file</span> : 
          null }
      </div>
    );
  }
}
