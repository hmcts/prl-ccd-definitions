Feature('Admin Web');

Scenario('add all the roles @pipeline', I => {
  I.loginToAdminConsole();
  I.createRole('caseworker-privatelaw-solicitor');
  I.createRole('caseworker-privatelaw-courtadmin');
  I.createRole('caseworker-privatelaw-judge');
  I.createRole('caseworker-privatelaw-la');
  I.createRole('caseworker-privatelaw-superuser');
  I.click('Manage User Roles');
  I.see('caseworker-privatelaw-solicitor');
  I.see('caseworker-privatelaw-courtadmin');
  I.see('caseworker-privatelaw-judge');
  I.see('caseworker-privatelaw-la');
  I.see('caseworker-privatelaw-superuser');
}).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers

Scenario('upload Family Private Law Config file @pipeline', I => {
  I.loginToAdminConsole();
  I.uploadConfig(`../../definitions/family-private/xlsx/${process.env.CCD_FILE_NAME}`);
  I.see('Case Definition data successfully imported');
}).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers
