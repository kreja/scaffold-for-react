/**
 * 常量
 */

/**
 * 环境
 */
const hostName = location.hostname;
let env;
if (hostName.indexOf('127.0.0.1') !== -1) {
  env = 'local';
} else {
  env = 'production';
}
export const ENV = env;


/**
 * host
 */
const host = {
  local: {
    server: ''
  },
  production: {
    server: ''
  }
};
export const HOST = host[env];
