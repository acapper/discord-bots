const r2 = require('r2');
const querystring = require('querystring');

var exports = (module.exports = {});

exports.webRequest = function (url, headers, queryParams) {
  let queryString = querystring.stringify(queryParams);
  url += `?${queryString}`;

  return new Promise(function (resolve, reject) {
    try {
      resolve(r2.get(url, { headers }).json);
    } catch (e) {
      reject(e);
    }
  });
};
