const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

function extractor(collection) {
  return Promise.map(collection.item, item => {
    //if item is a folder, create a folder
    if (item.item) {
      const directory = _.toLower(item.name.split(' ').join('_'));
      return fs.mkdirAsync(`test/testsFolder/${directory}`)
      .then(() => {
        Promise.map(item.item, test => {
          const json = JSON.stringify(test, null, 2);
          const file = _.toLower(test.name.split(' ').join('_'));
          return fs.writeFileAsync(`test/testsFolder/${directory}/${file}.json`, json);
        });
      })
      .catch(err => {
        if (err.code === 'EEXIST') {
          Promise.map(item.item, test => {
            const json = JSON.stringify(test, null, 2);
            const file = _.toLower(test.name.split(' ').join('_'));
            return fs.writeFileAsync(`test/testsFolder/${directory}/${file}.json`, json);
          });
        } else {
          throw new Error();
        }
      });
    } else { //if item is just a single test (not in a folder)
      const json = JSON.stringify(item, null, 2);
      const file = _.toLower(item.name.split(' ').join('_'));

      return fs.writeFileAsync(`./test/testsFolder/${file}.json`, json);
    }
  });
}


module.exports = extractor;

