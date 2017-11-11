import * as React from 'react';

let styles = require('./ProfileInput.scss');

export interface IProps {
  addSearchesFromProfile(file: File): void,
  toggleMenuDropDown(): void,
}

export class ProfileInput extends React.Component<IProps> {
  handleChange(selectorFiles: FileList | null) {
    this.props.toggleMenuDropDown();
    if (selectorFiles == null) {
      console.log('nope. need to submit a file.')
      return;
    }
    if (selectorFiles.length > 1) { 
      console.log('NOTE: Multiple files loaded on this input.');
    }

    if (selectorFiles[0].type === 'application/json') {
      this.props.addSearchesFromProfile(selectorFiles[0]);
    } else {
      console.log('incorrect file type');
    }
  }

  render() {
    return (
      <div className={styles.inputBlock}>
        <span>Search Profile: </span>
        <input 
          type="file" 
          accept="application/json" 
          onChange={ (e) => this.handleChange(e.target.files) }/>
      </div>
    );
  }
}
