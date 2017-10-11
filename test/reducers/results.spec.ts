import results from '../../app/reducers/results';
import { saveResults, exportResults } from '../../app/actions/results';

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

    it('should handle EXPORT_RESULTS', () => {
      expect(results(
        { hasRun: true, items: [] }, 
        exportResults())
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
