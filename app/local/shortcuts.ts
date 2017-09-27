// import { MenuItem } from 'electron';
import { search } from './fileSearcher';
import { setResults } from '../actions/results';
import { IResult } from '../reducers/results';
import { copyArray } from '../utils/helpers';
import * as store from '../store/configureStore';
const state = store.getState();

// // import { Menu, MenuItem } from 'electron';
// const { search } = require('./fileSearcher.ts');
// const { setResults } = require('../actions/results.ts');
// // let { IResult } = require('../reducers/results.ts');
// const { copyArray } = require('../utils/helpers.ts');
// const store = require('../store/configureStore.ts');
// const state = store.getState();

// const menu = new Menu();
// menu.append(new MenuItem({
//   label: 'Run Search',
//   accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
//   click: () => { console.log('time to print stuff') }
// }));

export const RunSearch = {   // new MenuItem({
  label: 'Run Search',
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
  click: () => { 
    // let searchForm: IFormState = {...this.props.searchForm}; 
    let phrases: Array<string> = copyArray(state.searchForm.phrases);

    if (state.searchForm.newPhrase && state.searchForm.phrases.indexOf(state.searchForm.newPhrase) == -1) {
      phrases.push(state.searchForm.newPhrase);
    }

    const results: Array<IResult> = search(state.searchForm.filename, phrases);

    setResults(results);
    console.log('ran search!');
  }
};  //);