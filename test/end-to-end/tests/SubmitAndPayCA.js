Feature('CA Submit and Pay');

Scenario('Create a Case and Submit/Pay ', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  const createdCaseUrl = await I.getCurrentPageUrl();
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
  await I.paymentCA();
  await I.logout();
  I.wait('2');
  await I.amOnPage(createdCaseUrl);
  await I.loginAsCourtAdmin();
}).retry({ retries: 3, minTimeout: 30000 });
