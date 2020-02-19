export const isFunction = (fnc) => Object.prototype.toString.call(fnc) === '[object Function]';
export { default as timeAgo } from './timeAgo';
export { default as formatMoney } from './formatMoney';