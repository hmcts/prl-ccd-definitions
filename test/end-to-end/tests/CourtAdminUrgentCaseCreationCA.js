Feature('Court Admin create Urgent Case CA Submit');

Scenario('Court Admin Urgent case creation and Submit @nightly', async I => {
  await I.loginAsCourtAdmin();
  await I.createC100UrgentCaseByCourtAdmin();
  await I.typeOfApplicationEventC100();
  await I.hearingUrgency();
  await I.childDetails();
  await I.applicantDetailsC100();
  await I.respondentDetailsC100();
  await I.otherPeopleInTheCase();
  await I.runOtherChildDetailsEvent();
  await I.runChildrenAndApplicant();
  await I.runChildrenAndRespondent();
  await I.runChildrenAndOtherPeople();
  await I.allegationsOfHarmEvent();
  await I.runMIAMEventHappyPath();
  await I.otherProceedingsEventC100();
  await I.runAttendingTheHearingEvent();
  await I.internationalElement();
  await I.litigationCapacity();
  await I.welshLanguageRequirement();
  await I.submitAndPayCourtAdmin();
}).retry({ retries: 3, minTimeout: 30000 });
