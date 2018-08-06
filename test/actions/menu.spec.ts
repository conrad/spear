import { spy } from 'sinon'
import * as actions from '../../app/actions/menu'


describe('menu actions', () => {
  it('should have toggleMenuDropDown() that returns toggleMenu action', () => {
    const fn = actions.toggleMenuDropDown()
    const dispatch = spy()
    fn(dispatch)

    expect(fn).toBeInstanceOf(Function)
    expect(dispatch.calledWith({ type: actions.toggleMenu.type })).toBe(true)
  })
})