import { actionCreator } from './helpers';
import { ISearch, IMove } from '../reducers/searches';

export const storeSearch = actionCreator<ISearch>('STORE_SEARCH');
export const deleteSearch = actionCreator<ISearch>('DELETE_SEARCH');
export const moveSearch = actionCreator<IMove>('MOVE_SEARCH');

export function addSearch(search: ISearch) {
  return (dispatch: Function) => {
    dispatch(storeSearch(search));
  }
}

export function updateSearch(search: ISearch) {
  return (dispatch: Function) => {
    dispatch(storeSearch(search));
  }
}

export function reorderSearch(move: IMove) {
  return (dispatch: Function) => {
    dispatch(moveSearch(move));
  };
}

export function removeSearch(index: number, name: string) {
  return (dispatch: Function) => {
    const search = {
      index,
      name,
      description: '',
      phrases: [],
      isIncluded: false,
      isEditing: false
    };
    dispatch(deleteSearch(search));
  };
}
