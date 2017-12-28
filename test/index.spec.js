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

    it('should extract individual tests into directory', () => {
      return extractor(sampleCollection)
      .then(directoryResut => {
        _.forEach(directoryResut, folderResult => {
          _.forEach(folderResult, fileResult => {
            expect(fileResult).to.be.undefined;
          });
        });
        expect(fs.existsSync('./test/skywalkerCollection/login/login.json')).to.be.true;
        expect(fs.existsSync('./test/skywalkerCollection/inventory_fetch.json')).to.be.true;
      });
    });

    it('should extract vader tests into a new folder', () => {
      return extractor(sampleCollection2)
        .then(directoryResult => {
          _.forEach(directoryResult, folderResult => {
            _.forEach(folderResult, fileResult => {
              expect(fileResult).to.be.undefined;
            });
          });
          expect(fs.existsSync('./test/vaderCollection/users')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/partners')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/lease_lender')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/fee_defaults')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/dealers')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/finance_lender')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/province_tax_setting')).to.be.true;
          expect(fs.existsSync('./test/vaderCollection/trims')).to.be.true;
        });
    });

  });

});
