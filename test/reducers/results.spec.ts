import results from '../../app/reducers/results'
import { exportResults, saveResults, showOverlay, toggleShowResult } from '../../app/actions/results'
import { emptyResultsSet, sampleResults } from '../fixtures/fixtures'
import { getCopy } from '../helpers'

describe('reducers', () => {
  describe('results', () => {
    it('should handle initial state', () => {
      expect(results(undefined, { type: 'unknown' })).toEqual(emptyResultsSet)
    })

    it('should handle SAVE_RESULTS', () => {
      expect(results(emptyResultsSet, saveResults(emptyResultsSet))).toEqual(emptyResultsSet)
    })

    it('should handle EXPORT_RESULTS', () => {
      expect(results(emptyResultsSet, exportResults())).toEqual(emptyResultsSet)
    })

    it('should handle TOGGLE_SHOW_RESULT', () => {
      // NOTE: Create copy of sample results object in order not to mutate it. 
      const resultsCopy = getCopy(sampleResults)
      let newResults = getCopy(sampleResults)
      newResults.items[0].show = true
      expect(results(resultsCopy, toggleShowResult(0))).toEqual(newResults)
    })

    it('should throw error when TOGGLE_SHOW_RESULT is called on non-existent result', () => {
      expect(() => {
        results(emptyResultsSet, toggleShowResult(0))
      }).toThrow()
    })

    it('should handle SHOW_RESULT_OVERLAY', () => {
      const resultIndex: number = 0
      const excerptIndex: number = 0
      // NOTE: Create copy of sample results object in order not to mutate it. 
      const resultsCopy = getCopy(sampleResults)
      let expectedResults = getCopy(sampleResults)
      expectedResults.overlay = {
        show: true,
        search: expectedResults.items[resultIndex].search,
        phrase: expectedResults.items[resultIndex].phrase,
        body: expectedResults.items[resultIndex].excerpts[excerptIndex].pageText,
      } 

      expect(
        results(resultsCopy, showOverlay({ resultIndex, excerptIndex }))
      ).toEqual(expectedResults)
    })

    it('should handle SHOW_RESULT_OVERLAY', () => {
      const resultIndex: number = 0
      const excerptIndex: number = 0
      // NOTE: Create copy of sample results object in order not to mutate it. 
      const resultsCopy = getCopy(sampleResults)
      let expectedResults = getCopy(sampleResults)
      expectedResults.overlay = {
        show: true,
        search: expectedResults.items[resultIndex].search,
        phrase: expectedResults.items[resultIndex].phrase,
        body: expectedResults.items[resultIndex].excerpts[excerptIndex].pageText,
      } 

      expect(
        results(resultsCopy, showOverlay({ resultIndex, excerptIndex }))
      ).toEqual(expectedResults)
    })

    it('should handle unknown action type', () => {
      expect(results(emptyResultsSet, { type: 'unknown' })).toEqual(emptyResultsSet)
      const resultsCopy = getCopy(sampleResults)
      expect(results(resultsCopy, { type: 'unknown' })).toEqual(sampleResults)
    })
  })
})
