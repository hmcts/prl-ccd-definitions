const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
 MEDIUM_STRING,
 isNotEmpty,
 isNotLongerThan,
 noDuplicateFound
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
        return v.startsWith('PRLAPPS');
});
 expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotEmpty());
 expect(row.Label).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('WorkBasketResultFields', () => {
 context('should :', () => {
   let uniqResult = [];

   before(() => {
     uniqResult = uniqWith(ccdData.WorkBasketResultFields, noDuplicateFound);
   });

   it('not contain duplicated definitions of the same field', () => {
     expect(uniqResult).to.equal(uniqResult);
   });

   it('should have only valid definitions', () => {
     uniqResult.forEach(assertFieldDefinitionIsValid);
   });
 });
});
