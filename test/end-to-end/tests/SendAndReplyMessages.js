Feature('Send and Reply to messages via case event, as different users');

Scenario('Create a Case as a Solicitor, Send and Reply to Messages via Case Event as Court Admin Users', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  let createdCaseUrl = await I.getCurrentPageUrl();
  await I.typeOfApplicationEventFL401();
  await I.runWithoutNoticeOrderHappyPath();
  await I.applicantDetailsFL401();
  await I.respondentDetailsFL401();
  await I.runApplicantsFamilyEvent();
  await I.runRelationshipToRespondent();
  await I.runRespondentBehaviour();
  await I.runTheHomeHappyPath();
  await I.statementOfTruth();
  I.wait('2');
  await I.signOut();
  await I.loginAsCourtAdminUserOne();
  I.wait('2');
  await I.amOnPage(createdCaseUrl);
  await I.sendMessage();

}).retry({ retries: 3, minTimeout: 30000 });
