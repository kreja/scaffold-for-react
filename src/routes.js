'use strict';

import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from 'components/layout';
import Home from 'containers/home';
import UserCard from 'containers/user-card';

let pageTitle = document.title;

window.menus = {
  home: {
    path: '/home',
    component: Home
  },
  usercard: {
    path: '/usercard',
    component: UserCard
  }
};

const onEnter = (nextState, replace, callback) => {
  callback();
  document.title = nextState.routes[1].title || pageTitle;  
};
const onChange = (prevState, nextState, replace, callback) => {
  callback();
  document.title = nextState.routes[1].title || pageTitle;  
  // let routePath = nextState.location.pathname;
};

function renderRoute() {
  let Menus = [];
  for (var pageName in window.menus) {
    let page = window.menus[pageName];
    Menus.push(
      <Route key={ pageName }
          path={ page.path }
          component={ page.component }
          title={ pageName } />
    );
  }
  return Menus;
}

export default (store) => {
  const history = syncHistoryWithStore(hashHistory, store);
  
  return (
    <Router history={history}>
      <Route path="/" component={Layout} onEnter={onEnter} onChange={onChange}>
        <IndexRoute component={Home}/>
        { renderRoute() }
        <Redirect from="*" to="/"/>
      </Route>
    </Router>
  );
};
