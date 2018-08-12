import { spy } from 'sinon'
import * as actions from '../../app/actions/searchForm'
import * as constants from '../../app/constants'
import { mockFile } from '../../test/fixtures/fixtures'

describe('searchForm actions', () => {
  it('should submitSearch should create submitSearch action', () => {
    const action = actions.submitSearch()

    expect(action.type).toEqual(constants.SUBMIT_SEARCH)
  })

  it('should resetFile should create resetFile action', () => {
    const action = actions.resetFile()

    expect(action.type).toEqual(constants.RESET_FILE)
})
  
  it('should setFile should create setFile action', () => {
    const action = actions.setFile(mockFile)

    expect(action.type).toEqual(constants.SET_FILE)
    expect(action.payload).toEqual(mockFile)
  })
  
  it('should setNewPhrase should create setNewPhrase action', () => {
    const phrase: string = 'something to look for'
    const action = actions.setNewPhrase(phrase)

    expect(action.type).toEqual(constants.SET_NEW_PHRASE)
    expect(action.payload).toEqual(phrase)

  })

  it('should setIsPhraseUsed should create setIsPhraseUsed action', () => {
    const action = actions.setIsPhraseUsed(false)

    expect(action.type).toEqual(constants.SET_IS_PHRASE_USED)
    expect(action.payload).toBeFalsy()

  })

  it('should updateNewPhrase should create setNewPhrase action', () => {
    let newPhrase: string = 'new phrase text'
    const fn = actions.updateNewPhrase(newPhrase)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({ 
      type: actions.setNewPhrase.type, 
      payload: newPhrase
    })).toBe(true)
  })

  it('should updateIsNewPhraseUsed should create setIsPhraseUsed action to true', () => {
    const fn = actions.updateIsNewPhraseUsed(true)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({ 
      type: actions.setIsPhraseUsed.type, 
      payload: true
    })).toBe(true)
  })

  it('should updateIsNewPhraseUsed should create setIsPhraseUsed action to false', () => {
    const fn = actions.updateIsNewPhraseUsed(false)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({ 
      type: actions.setIsPhraseUsed.type, 
      payload: false
    })).toBe(true)
  })
  
  it('should addFile should create setFile action', () => {
    const fn = actions.addFile(mockFile)
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    fn(dispatch)
    expect(dispatch.calledWith({ 
      type: actions.setFile.type, 
      payload: mockFile
    })).toBe(true)
  })

  // it('should addPhrase should create appendPhrase action', () => {
  //   const phrase: string = 'some particular phrase'
  //   const fn = actions.addPhrase(phrase)
  //   expect(fn).toBeInstanceOf(Function)
  //   const dispatch = spy()
  //   fn(dispatch)
  //   expect(dispatch.calledWith({ 
  //     type: actions.appendPhrase.type, 
  //     payload: phrase
  //   })).toBe(true)
  // })

  // it('should deletePhrase should create unsetPhrase action', () => {
  //   const index: number = 3
  //   const fn = actions.deletePhrase(index)
  //   expect(fn).toBeInstanceOf(Function)
  //   const dispatch = spy()
  //   fn(dispatch)
  //   expect(dispatch.calledWith({ 
  //     type: actions.unsetPhrase.type, 
  //     payload: index
  //   })).toBe(true)
  // })

  it('should submitValidSearch should create submitSearch action', () => {
    const fn = actions.submitSearchIfValid()
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    const getState = () => ({ 
      searchForm: {
        filename: 'hello.txt',
        phrases: ['one', 'two']
      }
    })
    fn(dispatch, getState)
    expect(dispatch.calledWith({ type: actions.submitSearch.type })).toBe(true)
  })

  it('should submitValidSearch should not create submitSearch action when filename is missing', () => {
    const fn = actions.submitSearchIfValid()
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    const getState = () => ({ 
      searchForm: {
        filename: '',
        phrases: ['one', 'two']
      }
    })
    fn(dispatch, getState)
    expect(dispatch.notCalled).toBe(true)
  })

  it('should submitValidSearch should not create submitSearch action when no phrases are included in search', () => {
    const fn = actions.submitSearchIfValid()
    expect(fn).toBeInstanceOf(Function)
    const dispatch = spy()
    const getState = () => ({ 
      searchForm: {
        filename: 'hello.txt',
        phrases: []
      }
    })
    fn(dispatch, getState)
    expect(dispatch.notCalled).toBe(true)
  })
})