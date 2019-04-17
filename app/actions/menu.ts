import { actionCreatorVoid } from './helpers';

export const toggleMenu = actionCreatorVoid('TOGGLE_MENU');

export function toggleMenuDropDown(): Function {
  return (dispatch: Function) => {
    dispatch(toggleMenu());
  }
}
