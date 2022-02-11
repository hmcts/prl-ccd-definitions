Feature('Applicant’s family');

Scenario('Applicant’s family - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.runApplicantsFamilyEvent();
}).retry({ retries: 3, minTimeout: 30000 });
