const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFound
} = require('../utils/utils');
const { AuthorisationCaseEvent } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('PRLAPPS');
  });
  expect(row.CaseEventID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.UserRole).to.be.a('string').and.satisfy(isNotEmpty());
  expect(('CRUD').includes(row.CRUD)).to.eql(true);
}

describe('AuthorisationCaseEvent', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(AuthorisationCaseEvent, noDuplicateFound);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.equal(uniqResult);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
