import { spy } from 'sinon'
import * as actions from '../../app/actions/searches'
import * as constants from '../../app/constants'
import ISearch from '../../app/types/ISearch';
import IMove from '../../app/types/IMove';
import { createPhrase } from '../../app/utils/helpers';
import IPhrase from '../../app/types/IPhrase';

// jest.runAllTimers();

const mockSearch: ISearch = {
  index: 0,
  isEditing: false,
  isIncluded: false,
  name: '',
  phrases: [],
}

const mockMove: IMove = {
  initialIndex: 1,
  nextIndex: 2
}

describe('searches actions', () => {
  it('should storeSearch should create storeSearch action', () => {
    const action = actions.storeSearch(mockSearch)
    
    expect(action.type).toEqual(constants.STORE_SEARCH)
    expect(action.payload).toEqual(mockSearch)
  })

  it('should unsetPhrase should create unsetPhrase action', () => {
    const phrase: IPhrase = createPhrase('', 0, 0)
    const action = actions.unsetPhrase(phrase)
    
    expect(action.type).toEqual(constants.UNSET_PHRASE)
    expect(action.payload).toEqual(phrase)
  })

  it('should deleteSearch should create deleteSearch action', () => {
    const action = actions.deleteSearch(mockSearch)

    expect(action.type).toEqual(constants.DELETE_SEARCH)
    expect(action.payload).toEqual(mockSearch)
  })

  it('should moveSearch should create moveSearch action', () => {
    const action = actions.moveSearch(mockMove)

    expect(action.type).toEqual(constants.MOVE_SEARCH)
    expect(action.payload).toEqual(mockMove)
  })

  it('should saveSearch should create storeSearch action', () => {
    const fn = actions.addSearch(mockSearch)

    expect(fn).toBeInstanceOf(Function)

    const dispatch = spy()
    fn(dispatch);
    
    expect(dispatch.calledWith({ 
      type: actions.storeSearch.type, 
      payload: mockSearch
    })).toBe(true);
  })

  it('should removeSearch should create deleteSearch action', () => {
    const fn = actions.removeSearch(
      mockSearch.index, 
      mockSearch.name
    );
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ 
      type: actions.deleteSearch.type, 
      payload: {
        index: mockSearch.index,
        name: mockSearch.name,
        isIncluded: false,
        phrases: [],
        isEditing: false
      }
    })).toBe(true);
  });

  it('should reorderSearch should create moveSearch action', () => {
    const fn = actions.reorderSearch(mockMove);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ 
      type: actions.moveSearch.type, 
      payload: mockMove
    })).toBe(true);
  });
});