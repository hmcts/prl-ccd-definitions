Feature('Applicant Details');

Scenario('Applicant Details - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.applicantDetails();
}).retry({ retries: 3, minTimeout: 30000 });
