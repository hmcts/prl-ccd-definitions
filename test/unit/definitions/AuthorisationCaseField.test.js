const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../utils/utils');
const { createAssertExists } = require('../utils/assertBuilders');
const { ccdData } = require('../utils/dataProvider');

const assertFieldExists = createAssertExists('Field');

describe('AuthorisationCaseField', () => {
  describe('should :', () => {
    let nonProdAuthorisationCaseField = [];
    let allFieldsForNonProd = [];

    before(() => {
      nonProdAuthorisationCaseField = ccdData.AuthorisationCaseField;
      allFieldsForNonProd = ccdData.CaseField;
    });

    it('contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(nonProdAuthorisationCaseField, isFieldDuplicated('CaseFieldID'));

      expect(uniqResult).to.eql(nonProdAuthorisationCaseField);
    });

    it('use existing fields', () => {
      assertFieldExists(nonProdAuthorisationCaseField, allFieldsForNonProd);
    });
  });
});
