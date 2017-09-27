import { spy } from 'sinon';
import * as actions from '../../app/actions/results';

describe('actions', () => {
  it('should saveResults should create saveResults action', () => {
    expect(actions.saveResults({ hasRun: true, items: [] })).toMatchSnapshot();
  });

  it('should saveResultsInFile should create saveResultsInFile action', () => {
    expect(actions.saveResultsInFile()).toMatchSnapshot();
  });

  it('should setResults should create saveResults action', () => {
    let results = { hasRun: true, items: [] };
    const fn = actions.setResults(results);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ 
      type: actions.saveResults.type, 
      payload: results
    })).toBe(true);
  });

  // it('should incrementIfOdd shouldnt create increment action if counter is even', () => {
  //   const fn = actions.incrementIfOdd();
  //   const dispatch = spy();
  //   const getState = () => ({ counter: 2 });
  //   fn(dispatch, getState);
  //   expect(dispatch.called).toBe(false);
  // });

  // // There's no nice way to test this at the moment...
  // it('should incrementAsync', done => {
  //   const fn = actions.incrementAsync(1);
  //   expect(fn).toBeInstanceOf(Function);
  //   const dispatch = spy();
  //   fn(dispatch);
  //   setTimeout(() => {
  //     expect(dispatch.calledWith({ type: actions.increment.type })).toBe(true);
  //     done();
  //   }, 5);
  // });
});
