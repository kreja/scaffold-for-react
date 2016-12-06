'use strict';

import * as actions from 'actions/user';

const initialState = {
  isFetching: false,
  name: ''
};

function handleReceiveUser(state = initialState, action) {
  return Object.assign({}, {
    isFetching: false,
    name: action.user.name
  });
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case actions.RECEIVE_USER:
      return Object.assign({}, state, handleReceiveUser(state, action));
    case actions.GET_STATIC_USER:
      return Object.assign({}, state, {
        isFetching: false,
        name: 'static jack'
      });
    default:
      return state;
  }
};