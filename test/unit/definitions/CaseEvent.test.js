const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  SHORT_STRING,
  MEDIUM_STRING,
  LONG_STRING,
  isNotEmpty, isNotLongerThan, noDuplicateFound,
  whenPopulated
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertEventDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('PRLAPPS');
  });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.Name).to.be.a('string').and.satisfy(isNotLongerThan(SHORT_STRING));
  expect(row.SecurityClassification).to.eq('Public');
  expect(row.PostConditionState).to.be.a('string').and.satisfy(isNotLongerThan(LONG_STRING));
  whenPopulated(row['PreConditionState(s)']).expect(isNotEmpty());
  whenPopulated(row.Description).expect(isNotLongerThan(LONG_STRING));
  whenPopulated(row.ShowSummary).expect(v => {
    return ['Y', 'N'].includes(v);
  });
  if (row.CallBackURLSubmittedEvent) {
    expect(row.CallBackURLSubmittedEvent).to.be.a('string').and.satisfy(isNotEmpty());
  }
  if (row.EventEnablingCondition) {
    expect(row.EventEnablingCondition).to.be.a('string').and.satisfy(isNotEmpty());
  }

  whenPopulated(row.EndButtonLabel).expect(isNotLongerThan(MEDIUM_STRING));
}

describe('CaseEvent', () => {
  describe('should ', () => {
    let nonProd = [];
    let uniqResult = [];

    before(() => {
      nonProd = ccdData.CaseEvent;
      uniqResult = uniqWith(nonProd, noDuplicateFound);
    });

    it('not contain duplicated definitions of the same event', () => {
      expect(uniqResult.length).to.equal(nonProd.length);
    });

    it('have only valid definitions', () => {
      uniqResult.forEach(assertEventDefinitionIsValid);
    });
  });
});
