'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actionUser from 'actions/user';

import CTest from 'components/test';
import './index.scss';

class UserCard extends React.Component {

  constructor(props) {
    super(props);

    [
      'loadStaticUserInfo',
      'loadUserInfo'
    ].map((s) => {
      this[s] = this[s].bind(this);
    });
  }
  loadStaticUserInfo() {
    this.props.getStaticUser();
  }
  loadUserInfo() {
    this.props.fetchUser().then((data) => {
      return data;
    }, (reason) => {
      alert(reason);
    });
  }
  render() {
    var { user } = this.props;

    return (
      <div className="c-user-card">
        <CTest />
        <div onClick={ this.loadStaticUserInfo }>加载静态用户信息</div>
        <div onClick={ this.loadUserInfo }>加载动态用户信息</div>
        <div>{ user.name }</div>
        {
          user.isFetching && <div>loading</div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getStaticUser: () => dispatch(actionUser.getStaticUser()),
    fetchUser: () => dispatch(actionUser.fetchUser())
  };
}

// map state to props
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
