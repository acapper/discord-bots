const config = require('../config');
const { webRequest } = require('./webrequest');

const CAT_API_URL = 'https://api.thecatapi.com/';
const CAT_API_KEY = config.catapi.apikey;

var exports = (module.exports = {});

exports.getImage = function (sub_id, type, breeds) {
  return new Promise(async function (resolve, reject) {
    var headers = {
      'X-API-KEY': CAT_API_KEY,
    };
    var queryParams = {
      has_breeds: breeds,
      mime_types: type,
      sub_id: sub_id,
      limit: 1,
    };

    const url = CAT_API_URL + 'v1/images/search';

    webRequest(url, headers, queryParams).then(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

exports.getFact = function () {
  return new Promise(async function (resolve, reject) {
    webRequest('https://catfact.ninja/fact', null).then(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
