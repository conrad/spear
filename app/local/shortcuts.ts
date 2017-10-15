import FileSearcher from './fileSearcher';
import { setResults } from '../actions/results';
import { IResults } from '../reducers/results';
import * as store from '../store/configureStore';
const state = store.getState();

export const RunSearch = {
  label: 'Run Search',
  accelerator: process.platform === 'darwin' ? 'Alt+Command+S' : 'Ctrl+Shift+S',
  click: () => { 
    if (!state.searches.file) {
      throw new Error('Must provide a file to search');
    }

    const fileSearcher = new FileSearcher();
    const results: IResults = { 
      hasRun: true, 
      items: fileSearcher.search(state.searches.file, state.searches.searches),
      overlay: {
        show: false,
        search: '',
        phrase: '',
        body: '',
      }
    };

    setResults(results);
    console.log('Ran search!');
  }
};  


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
