Feature('CA Submit and Pay - C100 Journey');

Scenario('Create a Case as a Solicitor, then Submit/Pay and continue with C100 Case Events as CourtAdmin User', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  // Enable below steps once Submit and Pay works on PR
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
  await I.logOut();
  await I.loginAsCourtAdminUserOne();
  I.wait('2');
// Enable below steps once Submit and Pay works on PR
  await I.amOnPage(createdCaseUrl);
  await I.sendMessage();
}).retry({ retries: 3, minTimeout: 30000 });

