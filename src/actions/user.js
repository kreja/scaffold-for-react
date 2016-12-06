'use strict';

import ajax from 'utils/ajax';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const GET_STATIC_USER = 'GET_STATIC_USER';



/**
 * 获取用户信息
 */
export function fetchUser() {
  return (dispatch) => {
    dispatch(requestUser());

    return ajax('user').then((data) => {
      dispatch(receiveUser(data));

      return data;
    });
  };
};

/**
 * 标记请求
 */
export function requestUser() {
  return { type: REQUEST_USER };
};

/**
 * 接收到用户信息
 * @param  {[obj]} user [用户信息]
 */
export function receiveUser(user) {
  return { type: RECEIVE_USER, user };
};


/**
 * 获取静态用户信息
 */
export function getStaticUser() {
  return { type: GET_STATIC_USER };
};
