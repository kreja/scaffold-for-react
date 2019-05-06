'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import Index from './containers/Index';

import './index.scss';


const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}>
  <div>
    <Index />
  </div>
</Provider>, document.getElementById('root'));
