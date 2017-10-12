import { spy } from 'sinon';
import * as actions from '../../app/actions/results';

const emptyResultsSet = { 
  hasRun: true, 
  items: [], 
  overlay: {
    show: false,
    search: '',
    phrase: '',
    body: '',
  }  
};

describe('actions', () => {
  it('should saveResults should create saveResults action', () => {
    expect(actions.saveResults(emptyResultsSet)).toMatchSnapshot();
  });

  it('should saveResultsInFile should create saveResultsInFile action', () => {
    expect(actions.saveResultsToFile()).toMatchSnapshot();
  });

  it('should setResults should create saveResults action', () => {
    const fn = actions.setResults(emptyResultsSet);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ 
      type: actions.saveResults.type, 
      payload: emptyResultsSet
    })).toBe(true);
  });
});
