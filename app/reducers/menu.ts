import { IAction } from '../actions/helpers';
import { toggleMenu } from '../actions/menu';
import { clone } from '../utils/helpers';

const initialState: IMenu = { show: false }; 

export interface IMenu {
  show: boolean,
};

export type TState = any;

export default function menu(state: IMenu = initialState, action: IAction) {
  let newState: any = clone(state);

  if (toggleMenu.test(action)) {
    newState.show = !newState.show;
    return newState;
  } 

  return newState;
}  