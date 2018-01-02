const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const createFilesInFolder = (collectionName, directory, individualItem) => {
  return Promise.map(individualItem, singleTest => {
    const json = JSON.stringify(singleTest, null, 2);
    const file = _.snakeCase(singleTest.name);
    return fs.writeFileAsync(`test/${collectionName}Collection/${directory}/${file}.json`, json);
  });
};

const createSingleFile = (collectionName, singleTest) => {
  const json = JSON.stringify(singleTest, null, 2);
  const file = _.snakeCase(singleTest.name);
  return fs.writeFileAsync(`test/${collectionName}Collection/${file}.json`, json);
};

const createDirectory = (collectionName, collection) => {
  return Promise.map(collection.item, item => {
    //if item is a folder of tests
    if (item.item) {
      const directory = _.snakeCase(item.name);
      return fs.mkdirAsync(`test/${collectionName}Collection/${directory}`)
      .then(() => createFilesInFolder(collectionName, directory, item.item))
      .catch(err => {
        if (err.code === 'EEXIST') {
          return createFilesInFolder(collectionName, directory, item.item);
        } else {
          throw new Error();
        }
      });

    } else { //if item is just a single test (not in a folder)
      return createSingleFile(collectionName, item);
    }
  });
};

const extractTests = (collectionName, collection) => {
  //save info (head) of collection object, then create directory
  return createSingleFile(collectionName, collection.info)
  .then(() => createDirectory(collectionName, collection));
};

module.exports = {
  createDirectory,
  createSingleFile,
  extractTests
};
