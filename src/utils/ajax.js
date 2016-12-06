import reqwest from 'reqwest';
import PromisePolyfill from 'es6-promise';

import { isObject } from './index';
import { apimaps } from './apimap';
import { HOST } from 'constants';

const Promise = PromisePolyfill.Promise;
const defaultConfig = {
  type: 'jsonp',
  method: 'get',
  withCredentials: true, // 必须有才能请求 post
  crossOrigin: true,
  timeout: 10000 // 没有 timeout 不会走到 fail
};

export default function ajax(api, params = {}) {
  return new Promise((resolve, reject) => {

    let url;
    let apiConfig = {};

    if (isObject(api)) {
      params = api;
      api = params.api;
    }

    apiConfig = apimaps[api] || {};
    url = HOST.server + apiConfig.api; // 确定 url

    if (!url || !apiConfig.api) {
      reject('接口地址错误!');
    }

    params = Object.assign({}, defaultConfig, apiConfig, params, {url: url});
    if (params.type === 'jsonp') {
      params.jsonpCallback = 'callback';
    }

    try {
      reqwest(params).then((resp) => {
        if (resp && resp.status && resp.status == '1') {
          resolve(resp.data);
        } else {
          reject(resp.msg || '请求失败');
        }
      }, () => {
        reject('系统网络出错');
      });
    } catch (e) {
      reject('系统出错，' + e);
    }
  });
}
