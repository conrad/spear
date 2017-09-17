import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Search, IProps } from '../components/Search';
import * as SearchActions from '../actions/searchForm';
import { IState } from '../reducers';

function mapStateToProps(state: IState): Partial<IProps> {
  return {
    searchForm: state.searchForm
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
  return bindActionCreators(SearchActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Search) as any as React.StatelessComponent<IProps>);
