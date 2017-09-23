import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Home, IProps } from '../components/Home';
import * as Actions from '../actions';
import { IState } from '../reducers';

function mapStateToProps(state: IState): Partial<IProps> {
  return {
    searchForm: state.searchForm,
    results: state.results
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
  return bindActionCreators(Actions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Home) as any as React.StatelessComponent<IProps>);
