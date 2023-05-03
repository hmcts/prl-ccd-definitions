Feature('Submit and Pay - DO');

Scenario('Submit and Pay - basic journey for FL401 Casetype', async I => {
  await I.loginAsSolicitor();
//  await I.createCaseFL401();
//  await I.typeOfApplicationEventFL401();
//  await I.runWithoutNoticeOrderHappyPath();
//  await I.applicantDetailsFL401();
//  await I.respondentDetailsFL401();
//  await I.runApplicantsFamilyEvent();
//  await I.runRelationshipToRespondent();
//  await I.runRespondentBehaviour();
//  await I.runTheHomeHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });
