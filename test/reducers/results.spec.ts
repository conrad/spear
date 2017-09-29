import results from '../../app/reducers/results';
import { saveResults, saveResultsToFile } from '../../app/actions/results';

describe('reducers', () => {
  describe('results', () => {
    it('should handle initial state', () => {
      expect(results(undefined, { type: 'unknown' })).toEqual({ hasRun: false, items: [] });
    });

    it('should handle SAVE_RESULTS', () => {
      expect(results(
        { hasRun: false, items: [] }, 
        saveResults({ hasRun: true, items: [] }))
      ).toEqual({ hasRun: true, items: [] });
    });

    it('should handle SAVE_RESULTS_TO_FILE', () => {
      expect(results(
        { hasRun: true, items: [] }, 
        saveResultsToFile())
      ).toEqual({ hasRun: true, items: [] });
    });

    it('should handle unknown action type', () => {
      expect(results(
        { hasRun: true, items: [] }, 
        { type: 'unknown' })
      ).toEqual({ hasRun: true, items: [] });
    });
  });
});
