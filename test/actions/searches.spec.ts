import { spy } from 'sinon';
import * as actions from '../../app/actions/searches';
import { ISearch, IMove } from '../../app/reducers/searches';

const mockSearch: ISearch = {
  isEditing: false,
  isIncluded: false,
  name: '',
  phrases: [],
};

const mockMove: IMove = {
  initialIndex: 1,
  nextIndex: 2
};

describe('actions', () => {
  it('should storeSearch should create storeSearch action', () => {
    expect(actions.storeSearch(mockSearch)).toMatchSnapshot();
  });

  it('should deleteSearch should create deleteSearch action', () => {
    expect(actions.deleteSearch(mockSearch)).toMatchSnapshot();
  });

  it('should moveSearch should create moveSearch action', () => {
    expect(actions.moveSearch(mockMove)).toMatchSnapshot();
  });

  it('should saveSearch should create storeSearch action', () => {
    const fn = actions.addSearch(
      mockSearch.index, 
      mockSearch.name, 
      mockSearch.description, 
      mockSearch.phrases
    );
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ 
      type: actions.storeSearch.type, 
      payload: mockSearch
    })).toBe(true);
  });

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
        description: '',
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