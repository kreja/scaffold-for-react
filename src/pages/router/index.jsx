'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Layout from 'components/layout/index';
import Page1 from './page1/index';
import Page2 from './page2/index';

import './index.scss';

ReactDOM.render(<div>
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/page1/:id" component={Page1}/>
        <Route path="/page2" component={Page2}/>
        <Route component={Page1} />
      </Switch>
    </Layout>
  </Router>
</div>, document.getElementById('root'));
