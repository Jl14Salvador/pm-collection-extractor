const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

const assembleCollection = () => {
  return Promise.map(files, file => {

  });
};

const generateFilePaths = totalPath => {
  return fs.readdirAsync(totalPath)
  .then(pathsArray => {
    return Promise.map(pathsArray, path => {
      //if path doesn't include json contents of the new path read again
      if (path.endsWith('.json')) return totalPath + '/' + path;
      //path is a folder
      else {
        const newPath = totalPath + '/' + path;
        return generateFilePaths(newPath);
      }
    })
    .then(generatedDirectory => _.flattenDeep(generatedDirectory));
  });
};

module.exports = {
  assembleCollection,
  generateFilePaths
};
