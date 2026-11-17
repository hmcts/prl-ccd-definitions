const { expect } = require('chai');
const { ccdData, AuthorisationCaseEvent } = require('../utils/dataProvider');

describe('Retired RPA event', () => {
  const event = ccdData.CaseEvent.find(row => {
    return row.ID === 'resendRpa';
  });
  const permissions = AuthorisationCaseEvent
    .filter(row => {
      return row.CaseEventID === 'resendRpa';
    })
    .flatMap(row => {
      if (row.AccessControl) {
        return row.AccessControl.flatMap(({ UserRoles, CRUD }) => {
          return UserRoles.map(UserRole => {
            return { UserRole, CRUD };
          });
        });
      }
      return [{ UserRole: row.UserRole, CRUD: row.CRUD }];
    });

  it('preserves access to historical entries for the previously authorised roles', () => {
    expect(event).to.be.an('object');

    const readers = permissions
      .filter(({ CRUD }) => {
        return CRUD.includes('R');
      })
      .map(({ UserRole }) => {
        return UserRole;
      });
    expect(readers).to.include.members([
      'caseworker-privatelaw-courtadmin',
      'caseworker-privatelaw-readonly'
    ]);
  });

  it('does not grant permission to execute the retired event to any role', () => {
    expect(permissions).not.to.be.empty;
    const executors = permissions.filter(({ CRUD }) => {
      return /[CUD]/.test(CRUD);
    });
    expect(executors).to.be.empty;
  });

  it('does not invoke retired COS callbacks', () => {
    expect(event).to.be.an('object');

    const callbacks = Object.entries(event).filter(([field, value]) => {
      return field.startsWith('CallBackURL') && value;
    });
    expect(callbacks).to.be.empty;
  });
});
