const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const {createDirectory} = require('./helpers.js');

function extractor(collection = {}) {
  //create main directory folder
  const collectionName = _.toLower(collection.info.name.split(' ').join('_'));
  return fs.mkdirAsync(`test/${collectionName}Collection`)
    .then(() => {
      return createDirectory(collection, collectionName);
    })
    .catch(err => {
      if (err.code === 'EEXIST') {
        return createDirectory(collection, collectionName);
      } else {
        throw new Error();
      }
    });
}

module.exports = extractor;

