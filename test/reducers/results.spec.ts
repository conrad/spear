import results, { IResults } from '../../app/reducers/results';
import { saveResults, exportResults } from '../../app/actions/results';

const emptyResultsSet: IResults = {
  hasRun: true, 
  items: [], 
  overlay: {
    show: false,
    search: '',
    phrase: '',
    body: '',
  }
};

describe('reducers', () => {
  describe('results', () => {
    it('should handle initial state', () => {
      expect(results(undefined, { type: 'unknown' })).toEqual({ hasRun: false, items: [] });
    });

    it('should handle SAVE_RESULTS', () => {
      expect(results(emptyResultsSet, saveResults(emptyResultsSet))).toEqual(emptyResultsSet);
    });

    it('should handle EXPORT_RESULTS', () => {
      expect(results(emptyResultsSet, exportResults())).toEqual(emptyResultsSet);
    });

    it('should handle unknown action type', () => {
      expect(results(
        emptyResultsSet, 
        { type: 'unknown' })
      ).toEqual(emptyResultsSet);
    });
  });
});
