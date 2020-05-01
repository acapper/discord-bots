const config = require('../config');
const { webRequest } = require('./webrequest');

const DOG_API_URL = 'https://api.thedogapi.com/';
const DOG_API_KEY = config.dogapi.apikey;

var exports = (module.exports = {});

exports.getImage = function (sub_id, type, breeds) {
  return new Promise(async function (resolve, reject) {
    var headers = {
      'X-API-KEY': DOG_API_KEY,
    };
    var queryParams = {
      has_breeds: breeds,
      mime_types: type,
      sub_id: sub_id,
      limit: 1,
    };

    const url = DOG_API_URL + 'v1/images/search';
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
    webRequest('https://some-random-api.ml/facts/dog').then(
      (result) => {
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
