const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFoundCT
} = require('../utils/utils');
const { CaseTypeTab } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('PRLAPPS');
  });
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.TabLabel).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('CaseTypeTab', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(CaseTypeTab, noDuplicateFoundCT);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(CaseTypeTab);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });

    it('should have correct tab order', () => {
      const expectedOrders = require('../utils/caseTypeTabOrders.json');

      uniqResult.forEach(row => {
        if (expectedOrders.hasOwnProperty(row.TabID)) {
          const expected = expectedOrders[row.TabID];
          expect(expected).to.include(row.TabDisplayOrder);
        }
      });
    });
  });
});
