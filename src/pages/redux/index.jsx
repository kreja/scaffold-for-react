'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import Index from './containers/Index';

import './index.scss';

const initialState = {
  todos: [{ id:'init', text:'init data' }]
};
const store = configureStore(initialState);
ReactDOM.render(<Provider store={store}>
  <div>
    <Index />
  </div>
</Provider>, document.getElementById('root'));
