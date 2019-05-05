'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Hello from 'components/Hello';

import './index.scss';

class Index extends React.Component {
  render() {
    return <div className="page-index">
      I'm page index.
      <Hello />
    </div>;
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
