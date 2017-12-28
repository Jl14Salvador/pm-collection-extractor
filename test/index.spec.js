/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const extractor = require('../lib/extractor.js');
const fs = require('fs');
const rimraf = require('rimraf');
const _ = require('lodash');

const sampleCollection = require('./sampleCollection.json');
const sampleCollection2 = require('./Vader.postman_collection.json');

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

    it.only('should extract tests into a new folder', () => {
      return extractor(sampleCollection)
      .then(results => {
        _.forEach(results, result => {
          expect(result).to.be.undefined;
        });
        expect(fs.existsSync('./test/skywalkerCollection/login/login.json')).to.be.true;
        expect(fs.existsSync('./test/skywalkerCollection/inventory_fetch.json')).to.be.true;
      });
    });

    it.skip('should extract vader tests into a new folder', () => {
      return extractor(sampleCollection2)
        .then(results => {
          _.forEach(results, result => {
            expect(result).to.be.undefined;
          });
          expect(fs.existsSync('./test/vaderCollection/users/login.json')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/partners')).to.be.true;
        });
    });

  });

});
