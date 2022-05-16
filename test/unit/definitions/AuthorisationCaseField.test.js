const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../utils/utils');
const { createAssertExists } = require('../utils/assertBuilders');
const { AuthorisationCaseFieldData, caseFieldata } = require('../utils/dataProvider');

const assertFieldExists = createAssertExists('Field');

describe('AuthorisationCaseField', () => {
  describe('should :', () => {
    it('contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(AuthorisationCaseFieldData, isFieldDuplicated('CaseFieldID'));
      var difference = AuthorisationCaseFieldData.filter(x => uniqResult.indexOf(x) === -1);
                        //console.log("Extra fields *** "+JSON.stringify(temp));
                      console.log("Extra fields temptemp length *** "+difference.length);
                      console.log("Extra fields difference *** "+JSON.stringify(difference));
      expect(uniqResult).to.eql(AuthorisationCaseFieldData);
    });

    it('use existing fields', () => {
      assertFieldExists(AuthorisationCaseFieldData, caseFieldata);
    });
  });
});
