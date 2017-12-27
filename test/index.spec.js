const {expect} = require('chai');
const sampleCollection = require('./sampleCollection.json');
const seperator = require('../lib/seperator.js');
const fs = require('fs');
const rimraf = require('rimraf');

describe('postman-collection-seperator', () => {

  before(() => {
    //clear out test/testFolder to start empty
    if (fs.existsSync('./testFolder/')) {
      rimraf('./testFolder', () => {
        console.log('testFolder removed');
      });
    }
    
  });

  after(() => {

  })

  describe('seperator', () => {

    it('should create a new json object', () => {
      return seperator(sampleCollection)
        .then(result => {
          expect(result).to.be.undefined;
          expect(fs.existsSync('./testFolder/login/login.json')).to.be.true;
          expect(fs.existsSync('./testFolder/inventory_fetch.json')).to.be.true;
        });
    });

  })
 
});
