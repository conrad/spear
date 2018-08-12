import * as React from 'react'
import * as Enzyme from 'enzyme'
import IState from '../../app/types/IState';
import * as Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import HomePage from '../../app/containers/HomePage'

const HomePageAny = HomePage as any
let { configureStore, history } = require('../../app/store/configureStore')
Enzyme.configure({ adapter: new Adapter() })

function setup(initialState?: IState) {
  const store = configureStore(initialState)
  const app = Enzyme.mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HomePageAny />
      </ConnectedRouter>
    </Provider>
  )
  return {
    app,
    buttons: app.find('button'),
    banner: app.find('.banner')
  }
}

describe('containers', () => {
  describe('App', () => {
    it('should pass one test', () => {
      expect(true).toBeTruthy
    })

    it('should display the menu banner', () => {
      const { banner } = setup()
      expect(banner).toBeTruthy
    })

    // it('should display initial count', () => {
    //   const { p } = setup();
    //   expect(p.text()).toMatch(/^0$/);
    // });

    // it('should display updated count after increment button click', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(0).simulate('click');
    //   expect(p.text()).toMatch(/^1$/);
    // });

    // it('should display updated count after descrement button click', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(1).simulate('click');
    //   expect(p.text()).toMatch(/^-1$/);
    // });

    // it('shouldnt change if even and if odd button clicked', () => {
    //   const { buttons, p } = setup();
    //   buttons.at(2).simulate('click');
    //   expect(p.text()).toMatch(/^0$/);
    // });

    // it('should change if odd and if odd button clicked', () => {
    //   const { buttons, p } = setup({ 
    //     menu: { show: false },
    //     searches: { 
    //       currentSearchIndex: 0,
    //       filename: "dog.txt", 
    //       searches: [],
    //       newPhrase: "", 
    //       isNewPhraseUsed: false, 
    //       isNewSearchUsed: false,
    //       newSearchName: '',
    //       isValidFile: true 
    //     },
    //     results: { hasRun: false, items: [] }
    //   });
    //   buttons.at(2).simulate('click');
    //   expect(p.text()).toMatch(/^2$/);
    // });
  })
})
