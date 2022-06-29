Feature('Send and Reply to messages via case event, as different users');

Scenario('Create a Case as a Solicitor, Send and Reply to Messages via Case Event as Court Admin Users', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  let createdCaseUrl = await I.getCurrentPageUrl();
  await I.typeOfApplicationEventC100();
  await I.hearingUrgency();
  await I.applicantDetailsC100();
  await I.childDetails();
  await I.respondentDetailsC100();
  await I.allegationsOfHarmEvent();
  await I.runMIAMEventHappyPath();
  await I.otherPeopleInTheCase();
  await I.otherProceedingsEventC100();
  await I.runAttendingTheHearingEvent();
  await I.internationalElement();
  await I.litigationCapacity();
  await I.welshLanguageRequirement();
  await I.runSubmitAndPayHappyPath();
  I.wait('2');
  await I.signOut();
  await I.loginAsCourtAdminUserOne();
  I.wait('2');
  await I.amOnPage(createdCaseUrl);
  await I.sendMessage();

}).retry({ retries: 3, minTimeout: 30000 });
