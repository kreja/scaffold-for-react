'use strict';

import React from 'react';

import './index.scss';

class Layout extends React.Component {
  componentDidMount() {
    console.log('layout did mount!')
  }
  render() {
    return <div className="c-layout">
      <div>im layout</div>
      <div className="layout-content">
        { this.props.children }
      </div>
    </div>;
  }
}

export default Layout;