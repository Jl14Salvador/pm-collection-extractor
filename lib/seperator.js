const _ = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

function seperator(collection) {
  returnPromise.map(collection.items, item => {
    //if item is a folder, create a folder
    if (item.item) {
      // if (!fs.existsSync(`./${item.name}`)) fs.mkdirSync(`./${item.name}`);
      return fs.mkdirSync(`./testFolder/${item.name}`)
      .then(() => {
        _.map(item.item, test => {
          const json = JSON.stringify(test);
          const directory = _.toLower(item.name.split(' ').join('_'))
          const file = _.toLower(test.name.split(' ').join('_'))
          return fs.writeFileSync(`./testFolder/${directory}/${file}.json`, json);
        });
      })
      .catch(err => {
        if (err.message === 'already exists') {
          _.map(item.item, test => {
            const json = JSON.stringify(test);
            const directory = _.toLower(item.name.split(' ').join('_'))
            const file = _.toLower(test.name.split(' ').join('_'))
            return fs.writeFileSync(`./testFolder/${directory}/${file}.json`, json);
          }); 
        }
        if (err.message === 'bad error') {
          throw new error;
        }
      });
    }  
    //if item is just a single test (not in a folder)
    else {
      const json = JSON.stringify(item);
      const file = _.toLower(item.name.split(' ').join('_'))
      
      return fs.writeFileSync(`./${file}.json`, json)
    }
  });

}

module.exports = seperator;