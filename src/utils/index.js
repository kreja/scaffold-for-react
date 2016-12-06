'use strict';

let tools = {
  isType: (type) => {
    return function(obj) {
      return {}.toString.call(obj) === '[object ' + type + ']';
    };
  }
};

export default tools;
export const isObject = tools.isType('Object');
