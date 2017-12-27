const _ = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

function extractor(collection) {
  return Promise.map(collection.item, item => {
    //if item is a folder, create a folder
    if (item.item) {
      // if (!fs.existsSync(`./${item.name}`)) fs.mkdirSync(`./${item.name}`);
      const directory = _.toLower(item.name.split(' ').join('_'));
      return fs.mkdirSync(`${directory}`)
      .then(() => {
        console.log('FILE');

        Promise.map(item.item, test => {
          const json = JSON.stringify(test);
          const file = _.toLower(test.name.split(' ').join('_'));
          return fs.writeFileSync(`testFolder/${directory}/${file}.json`, json);
        });
      })
      .catch(err => {
        if (err.code === 'EEXIST') {
          Promise.map(item.item, test => {
            const json = JSON.stringify(test);
            const file = _.toLower(test.name.split(' ').join('_'));
            return fs.writeFileSync(`testFolder/${directory}/${file}.json`, json);
          });
        } else {
          throw new Error();
        }
      });
    } else { //if item is just a single test (not in a folder)
      const json = JSON.stringify(item);
      const file = _.toLower(item.name.split(' ').join('_'));

      return fs.writeFileSync(`./${file}.json`, json);
    }
  });

}

module.exports = extractor;
