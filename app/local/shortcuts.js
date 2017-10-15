"use strict";
exports.__esModule = true;
var fileSearcher_1 = require("./fileSearcher");
var results_1 = require("../actions/results");
var store = require("../store/configureStore");
var state = store.getState();
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
exports.RunSearch = {
    label: 'Run Search',
    accelerator: process.platform === 'darwin' ? 'Alt+Command+S' : 'Ctrl+Shift+S',
    click: function () {
        // let searchForm: IFormState = {...this.props.searchForm}; 
        // let phrases: Array<string> = copyArray(state.searchForm.phrases);
        // if (state.searchForm.newPhrase && state.searchForm.phrases.indexOf(state.searchForm.newPhrase) == -1) {
        //   phrases.push(state.searchForm.newPhrase);
        // }
        if (!state.searches.file) {
            throw new Error('Must provide a file to search');
        }
        var fileSearcher = new fileSearcher_1["default"]();
        var results = {
            hasRun: true,
            items: fileSearcher.search(state.searches.file, state.searches.searches),
            overlay: {
                show: false,
                search: '',
                phrase: '',
                body: ''
            }
        };
        results_1.setResults(results);
        console.log('ran search!');
    }
};
//);
