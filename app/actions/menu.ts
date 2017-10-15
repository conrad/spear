import { actionCreatorVoid } from './helpers';

export const toggleMenu = actionCreatorVoid('TOGGLE_MENU');

export function toggleMenuDropDown() {
  return (dispatch: Function) => {
    dispatch(toggleMenu());
  }
}
