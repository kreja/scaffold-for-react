'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import createRoute from './routes';
import createStore from 'store';
import reducers from 'reducers';


import './index.scss';


const store = createStore(reducers);

ReactDom.render(
  <Provider store={ store }>
    { createRoute(store) }
  </Provider>,
  document.getElementById('container')
);
