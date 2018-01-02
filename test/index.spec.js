/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const extractor = require('../lib/extractor.js');
const fs = require('fs');
const rimraf = require('rimraf');
const _ = require('lodash');

const Assembler = require('../lib/assembler.js');
const sampleCollection = require('./sampleCollection.json');
const sampleCollection2 = require('./Vader.postman_collection.json');

describe('pm-collection-extractor', () => {

  const shouldNotPass = () => {
    throw new Error('should not pass');
  };

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

    it('should throw when no collection is passed', () => {
      return extractor()
      .then(shouldNotPass)
      .catch(err => {
        expect(err.message).to.equal('No collection passed');
      });
    });

  });

  describe('assembler', () => {

    it('should return skywalker files', () => {
      return Assembler.generateFilePaths('test/skywalkerCollection')
      .then(results => {
        // console.log('SKYWALKER\n', results);
        expect(results).to.be.an('array');
      });
    });

    it('should return vader files', () => {
      return Assembler.generateFilePaths('test/vaderCollection')
        .then(results => {
          // console.log('VADER\n', results);
          expect(results).to.be.an('array');
        });
    });

    it('should assemble sample collection', () => {
      return Assembler.assembleCollection('test/skywalkerCollection')
      .then(result => {
        console.log('RESULT SAMPLE\n', result);
        expect(result.info).to.exist;
        expect(result.item).to.exist;
      });
    });

    it('should assemble vader collection', () => {
      return Assembler.assembleCollection('test/vaderCollection')
        .then(result => {
          console.log('RESULT VADER\n', result);
          expect(result.info).to.exist;
          expect(result.item).to.exist;
          _.forEach(result.item, item => {
            expect(item.name).to.exist;
            console.log('ITEM', item);
          });
          // console.log('VADER ITEMS\n', result.item);
        });
    });

    it('should throw error if no path passed', () => {
      return Assembler.assembleCollection()
      .then(shouldNotPass)
      .catch(err => {
        expect(err.message).to.equal('no directory path passed');
      });
    });

  });

});
