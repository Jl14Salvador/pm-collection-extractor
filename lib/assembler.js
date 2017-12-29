const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

const generateFilePaths = totalPath => {
  return fs.readdirAsync(totalPath)
  .then(pathsArray => {
    return Promise.map(pathsArray, path => {
      //if path is a file, return file path
      if (path.endsWith('.json')) return totalPath + '/' + path;
      //if path is a folder call again
      else {
        const newPath = totalPath + '/' + path;
        return generateFilePaths(newPath);
      }
    })
    .then(generatedDirectory => _.flattenDeep(generatedDirectory));
  });
};

const assembleCollection = directoryPath => {
  return generateFilePaths(directoryPath)
  .then(filePaths => {
    console.log(filePaths);
    return Promise.map(filePaths, file => {
      return fs.readFileAsync(file, 'utf8')
      .then(JSON.parse);
    })
    .then(testFolders => {
      return _.reduce(testFolders, (newObj, currObj) => {
        if (currObj._postman_id) {
          newObj.info = currObj;
          return newObj;
        }
        if (!newObj.item) {
          newObj.item = [];
          newObj.item.push(currObj);
        } else {
          newObj.item.push(currObj);
        }
        return newObj;
      }, {});
    });
  });
};

module.exports = {
  assembleCollection,
  generateFilePaths
};
