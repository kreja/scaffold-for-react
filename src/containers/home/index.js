'use strict';

import React from 'react';
import { connect } from 'react-redux';

import CTest from 'components/test';
import './index.scss';

class Home extends React.Component {

  constructor(props) {
    super(props);

    [
    ].map((s) => {
      this[s] = this[s].bind(this);
    });
  }
  render() {

    return (
      <div className="c-home">
        <div>WELCOME HOME</div>
        <CTest />
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
    dispatch
  };
}

// map state to props
export default connect(mapStateToProps, mapDispatchToProps)(Home);
