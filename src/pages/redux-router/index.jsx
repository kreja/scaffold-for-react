'use strict';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import configureStore from './configureStore';

import Layout from 'components/layout/index';

import './index.scss';

const initialState = {
  todos: [{ id:'init', text:'init data' }]
};
const store = configureStore(initialState);

const Page1 = lazy(() => import(/* webpackChunkName: "reduxrouterpage1" */ './containers/page1'));
const Page2 = lazy(() => import(/* webpackChunkName: "reduxrouterpage2" */ './containers/page2'));

ReactDOM.render(<Provider store={store}>
  <Router>
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Page1}/>
          <Route exact path="/page2" component={Page2}/>
          <Route component={Page1} />
        </Switch>
      </Suspense>
    </Layout>
  </Router>
</Provider>, document.getElementById('root'));
