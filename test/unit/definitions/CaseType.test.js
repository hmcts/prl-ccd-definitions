const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFound
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.ID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('PRLAPPS');
  });
  expect(row.SecurityClassification).to.eq('Public');
  expect(row.Name).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.Description).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.JurisdictionID).to.eql('PRIVATELAW');
}

describe('CaseType', () => {
  describe('should :', () => {
    let uniqResult = [];

    beforeEach(() => {
      uniqResult = uniqWith(ccdData.CaseType, noDuplicateFound);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});