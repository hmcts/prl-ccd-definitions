Feature('Applicant Details');

Scenario('Applicant Details - basic journey for FL401 Casetype', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.applicantDetailsFL401();
}).retry({ retries: 3, minTimeout: 30000 });
