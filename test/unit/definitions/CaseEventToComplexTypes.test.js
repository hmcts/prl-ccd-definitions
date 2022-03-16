const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFound
} = require('../utils/utils');
const { CaseEventToComplexTypes } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('PRLAPPS');
  });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.CaseEventID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ListElementCode).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('CaseEventToComplexTypes', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(CaseEventToComplexTypes, noDuplicateFound);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.equal(uniqResult);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
