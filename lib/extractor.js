const _ = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

function extractor(collection) {
  return Promise.map(collection.item, item => {
    //if item is a folder, create a folder
    if (item.item) {
      const directory = _.toLower(item.name.split(' ').join('_'));
      return Promise.try(() => fs.mkdirSync(`test/testFolder/${directory}`))
      .then(() => {
        Promise.map(item.item, test => {
          const json = JSON.stringify(test, null, 2);
          const file = _.toLower(test.name.split(' ').join('_'));
          return fs.writeFileSync(`test/testFolder/${directory}/${file}.json`, json);
        });
      })
      .catch(err => {
        if (err.code === 'EEXIST') {
          Promise.map(item.item, test => {
            const json = JSON.stringify(test, null, 2);
            const file = _.toLower(test.name.split(' ').join('_'));
            return Promise.try(() => fs.writeFileSync(`test/testFolder/${directory}/${file}.json`, json));
          });
        } else {
          throw new Error();
        }
      });
    } else { //if item is just a single test (not in a folder)
      const json = JSON.stringify(item, null, 2);
      const file = _.toLower(item.name.split(' ').join('_'));

      return fs.writeFileSync(`./test/testFolder/${file}.json`, json);
    }
  });
}

module.exports = extractor;
