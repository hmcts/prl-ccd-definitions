const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
 MEDIUM_STRING,
 isNotEmpty,
 isNotLongerThan,
 noDuplicateFound
} = require('../utils/utils');
const { ComplexTypes } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
 expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
 if(row.ListElementCode) {
    expect(row.ListElementCode).to.be.a('string').and.satisfy(isNotEmpty());
 }
 expect(row.SecurityClassification).to.eq('Public');
 expect(row.FieldType).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
 if (row.FieldType === 'Collection' || row.FieldType === 'FixedList' ||
   row.FieldType === 'FixedRadioList' || row.FieldType === 'MultiSelectList') {
   expect(row.FieldTypeParameter).to.be.a('string').and.satisfy(isNotEmpty());
 }
}

describe('ComplexTypes', () => {
 context('should :', () => {
   let uniqResult = [];

   before(() => {
     uniqResult = uniqWith(ComplexTypes, noDuplicateFound);
   });

   it('not contain duplicated definitions of the same field', () => {
     expect(uniqResult).to.equal(uniqResult);
   });

   it('should have only valid definitions', () => {
     uniqResult.forEach(assertFieldDefinitionIsValid);
   });
 });
});