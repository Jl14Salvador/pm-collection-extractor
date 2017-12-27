/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const sampleCollection = require('./sampleCollection.json');
const extractor = require('../lib/extractor.js');
const fs = require('fs');
const rimraf = require('rimraf');

describe('pm-collection-extractor', () => {

  before(() => {
    //clear out test/testFolder to start empty
    if (fs.existsSync('./testFolder/')) {
      rimraf('./testFolder', () => {
        console.log('testFolder removed');
      });
    }
  });

  after(() => {

  });

  describe('extractor', () => {

    it('should create a new json object', () => {
      console.log(sampleCollection);
      return extractor(sampleCollection)
      .then(result => {
        expect(result).to.be.undefined;
        expect(fs.existsSync('./testFolder/login/login.json')).to.be.true;
        expect(fs.existsSync('./testFolder/inventory_fetch.json')).to.be.true;
      });
    });

  });

});
