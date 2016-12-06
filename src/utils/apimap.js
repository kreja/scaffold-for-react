'use strict';

import { ENV } from 'constants';

let apimap = {
  user: {
    api: '/get/user'
  }
  // xx: {
  //   api: '/xx/xx',
  //   data: {
  //     xx: ''
  //   }
  // }
};

// 本地 api 修改请求地址
if (ENV === 'local') {
  for (var key in apimap) {
    var item = apimap[key];
    if (item && item.api) {
      item.api = '/data/' + key + '.json';
      item.type = 'json';
    }
  }
}

export const apimaps = apimap;
