const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../utils/utils');
const { AuthorisationCaseFieldData } = require('../utils/dataProvider');

describe('AuthorisationCaseField', () => {
  describe('should :', () => {
    it('contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(AuthorisationCaseFieldData, isFieldDuplicated('CaseFieldID'));
      expect(uniqResult).to.eql(AuthorisationCaseFieldData);
    });
  });
});
