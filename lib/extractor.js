const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const {extractTests} = require('./helpers.js');

function extractor(collection) {
  if (!collection) return Promise.reject(new Error('No collection passed'));

  const collectionName = _.camelCase(collection.info.name);
  return fs.mkdirAsync(`test/${collectionName}Collection`)
  .then(() => extractTests(collectionName, collection))
  .catch(err => {
    if (err.code === 'EEXIST') {
      return extractTests(collectionName, collection);
    } else {
      throw new Error('Tests could not be extracted');
    }
  });
}

module.exports = extractor;

