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
});
