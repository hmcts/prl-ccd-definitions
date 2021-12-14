Feature('Admin Web');

Scenario('add all the roles @pipeline', I => {
  I.loginToAdminConsole();
  I.createRole('caseworker-privatelaw-solicitor');
  I.createRole('caseworker-privatelaw-courtadmin');
  I.createRole('caseworker-privatelaw-judge');
  I.createRole('caseworker-privatelaw-la');
  I.createRole('caseworker-privatelaw-superuser');
  I.createRole('caseworker-privatelaw-systemupdate');
  I.click('Manage User Roles');
  I.see('caseworker-privatelaw-solicitor');
  I.see('caseworker-privatelaw-courtadmin');
  I.see('caseworker-privatelaw-judge');
  I.see('caseworker-privatelaw-la');
  I.see('caseworker-privatelaw-superuser');
  I.see('caseworker-privatelaw-systemupdate');
}).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers

Scenario('upload Private Law Config file @pipeline', I => {
  I.loginToAdminConsole();
  I.uploadConfig(`../../definitions/private-law/xlsx/${process.env.CCD_FILE_NAME}`);
  I.see('Case Definition data successfully imported');
}).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers
