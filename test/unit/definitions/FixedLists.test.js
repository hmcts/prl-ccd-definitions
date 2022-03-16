const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFound
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.ID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ListElementCode).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ListElement).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('FixedLists', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(ccdData.FixedLists, noDuplicateFound);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.equal(uniqResult);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
