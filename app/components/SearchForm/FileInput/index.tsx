import * as React from 'react';

let styles = require('./FileInput.scss');

export class FileInput extends React.Component<any, string> {
  handleChange(selectorFiles: FileList | null) {
    // TODO: Emit action that proper file has NOT been made available.
    
    console.log(selectorFiles);
    if (selectorFiles == null) {
      console.log('nope. need to submit a file.')
      return;
    }
    if (selectorFiles.length > 1) {
      console.log('uh. you can only search one file');
    }

    if (selectorFiles[0].type === 'text/plain'
      || selectorFiles[0].type === 'application/msword'
    ) {
      console.log('correct file type');
      // TODO: Emit action that appropriate file has been made available.
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
