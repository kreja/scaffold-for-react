'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import createStore from 'store';
import reducers from 'reducers';

import UserCard from 'containers/user-card';

import './index.scss';


const store = createStore(reducers);
ReactDom.render(
  <Provider store={store}>
    <UserCard />
  </Provider>,
  document.getElementById('container')
);
