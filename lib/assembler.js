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
  if (!directoryPath) return Promise.reject(new Error('no directory path passed'));
  // let folderContents = {
  //   isFolder,
  //   name
  // };

  return generateFilePaths(directoryPath)
  .then(filePaths => {
    console.log(filePaths);
    return Promise.map(filePaths, filePath => {
      //if file contains a path
      // if (filePath.match(/test\/vaderCollection/)) {
      //   folderContents.isFolder = true;
      //   folderContents.name = 'name';
      // }
      return fs.readFileAsync(filePath, 'utf8')
      .then(JSON.parse);
    })
    .then(testFolders => {
      return _.reduce(testFolders, (assembledCollection, currObj, index) => {
        //if its the head info object
        if (currObj._postman_id) {
          assembledCollection.info = currObj;
          return assembledCollection;
        }

        //if item doesn't exist
        if (!assembledCollection.item) {
          assembledCollection.item = [];
          let splitPaths = filePaths[index].split('/');
          //if its a folder of a test
          if (splitPaths.length > 3) {
            const newObj = {
              name: splitPaths[2],
              description: '',
              item: []
            };
            _.map(assembledCollection.item, singleItem => {
              if (singleItem.name === newObj.name) singleItem.item.push(currObj);
              else assembledCollection.item.push(newObj);
            });
          }
        } else {
          let splitPaths = filePaths[index].split('/');
          //if its a folder of a test
          if (splitPaths.length > 3) {
            const newObj = {
              name: splitPaths[2],
              description: '',
              item: []
            };
            _.map(assembledCollection.item, singleItem => {
              if (singleItem.name === newObj.name) singleItem.item.push(currObj);
              else assembledCollection.item.push(newObj);
            });
          }
        }
        return assembledCollection;
      }, {});
    });
  });
};

module.exports = {
  assembleCollection,
  generateFilePaths
};
