import { actionCreator } from './helpers';
import { ISearch, IMove } from '../reducers/searches';

export const storeSearch = actionCreator<ISearch>('STORE_SEARCH');
export const deleteSearch = actionCreator<ISearch>('DELETE_SEARCH');
export const moveSearch = actionCreator<IMove>('MOVE_SEARCH');

export function saveSearch(index: number, name: string, description: string|null, phrases: Array<string>) {
  return (dispatch: Function) => {
    const search = {
      index,
      name,
      description,
      phrases,
      isEditing: false
    };

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
      isEditing: false
    };
    dispatch(deleteSearch(search));
  };
}
