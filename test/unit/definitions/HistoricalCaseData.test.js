const { expect } = require('chai');
const { caseFieldData, AuthorisationCaseFieldData } = require('../utils/dataProvider');

describe('Historical case data compatibility', () => {
  it('recognises the legacy court code in callback responses from existing cases', () => {
    const legacyCourtCode = caseFieldData.find(field => {
      return field.ID === 'courtCodeFromFact';
    });

    expect(legacyCourtCode).to.include({ CaseTypeID: 'PRLAPPS', FieldType: 'Text' });
  });

  it('preserves the existing permissions for the legacy court code', () => {
    const authorisations = AuthorisationCaseFieldData.filter(row => {
      return row.CaseFieldID === 'courtCodeFromFact';
    }).flatMap(row => {
      return row.AccessControl ? row.AccessControl.flatMap(accessControl => {
        return accessControl.UserRoles.map(role => {
          return [role, accessControl.CRUD];
        });
      }) : [[row.UserRole, row.CRUD]];
    });

    expect(Object.fromEntries(authorisations)).to.deep.equal({
      'caseworker-privatelaw-systemupdate': 'CRUD',
      'caseworker-privatelaw-courtadmin': 'CRUD',
      'caseworker-privatelaw-solicitor': 'CRUD',
      'caseworker-privatelaw-la': 'R',
      'caseworker-privatelaw-judge': 'R',
      'caseworker-privatelaw-superuser': 'R',
      citizen: 'R',
      courtnav: 'R',
      'caseworker-wa-task-configuration': 'R',
      'caseworker-privatelaw-readonly': 'R'
    });
  });
});
