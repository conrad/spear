import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Home, IProps } from '../components/Home';
import * as Actions from '../actions';
import IState from '../types/IState';

const mapStateToProps = (state: IState): Partial<IProps> => {
  return {
    searches: state.searches,
    results: state.results,
    menu: state.menu,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IState>): Partial<IProps> => {
  return bindActionCreators(Actions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Home) as any as React.StatelessComponent<IProps>);
