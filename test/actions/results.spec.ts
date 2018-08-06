import { spy } from 'sinon'
import { emptyResultsSet } from '../fixtures/fixtures'
import * as actions from '../../app/actions/results'
import * as constants from '../../app/constants'

describe('results actions', () => {
  // it('should saveResults should create saveResults action', () => {
  //   expect(actions.saveResults(emptyResultsSet)).toMatchSnapshot()
  // })
  // it('should saveResultsInFile should create saveResultsInFile action', () => {
  //   expect(actions.saveResultsToFile()).toMatchSnapshot()
  // })

  it('should exportResults should create exportResults action', () => {
    expect(actions.exportResults().type).toEqual(constants.EXPORT_RESULTS)
  })

  it('should toggleShowResult should create toggleShowResult action', () => {
    const action = actions.toggleShowResult(1)
    expect(action.type).toEqual(constants.TOGGLE_SHOW_RESULT)
    expect(action.payload).toEqual(1)
  })

  it('should setResults should create saveResults action', () => {
    const fn = actions.setResults(emptyResultsSet)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({ 
      type: actions.saveResults.type, 
      payload: emptyResultsSet
    })).toBe(true)
  })

  it('should toggleShowSearchResultRows should create toggleShowResult action', () => {
    const fn = actions.toggleShowSearchResultRows(1)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({
      type: actions.toggleShowResult.type, 
      payload: 1
    })).toBe(true)
  })

  it('should showResultOverlay should create showResultOverlay action', () => {
    const fn = actions.showResultOverlay(0, 1)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({
      type: actions.showOverlay.type, 
      payload: {
        resultIndex: 0,
        excerptIndex: 1,
      }
    })).toBe(true)
  })

  it('should hideResultOverlay should create hideResultOverlay action', () => {
    const fn = actions.hideResultOverlay()
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({
      type: actions.hideOverlay.type, 
    })).toBe(true)
  })

  it('should saveResultsToFile should create saveResultsToFile action', () => {
    const fn = actions.saveResultsToFile()
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    const getState = () => ({ 
      searches: {
        searches: []
      },
      results: {
        items: []
      }
    })
    fn(dispatch, getState)
    expect(dispatch.calledWith({
      type: actions.exportResults.type, 
    })).toBe(true)
  })
})
