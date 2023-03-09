Feature('CA Submit and Pay');

Scenario('Create a Case and Submit/Pay ', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.typeOfApplicationEventC100();
  await I.hearingUrgency();
  await I.applicantDetailsC100();
  await I.childDetails();
  await I.respondentDetailsC100();
  await I.runOtherPeopleInTheCase();
  await I.runOtherChildrenNotInCase();
  await I.runChildrenAndApplicantRelationship();
  await I.runChildrenAndRespondentRelationship();
  await I.runChildrenAndOtherPeopleRelationship();
  await I.allegationsOfHarmEvent();
  await I.runMIAMEventHappyPath();
  await I.otherProceedingsEventC100();
  await I.runAttendingTheHearingEvent();
  await I.internationalElement();
  await I.litigationCapacity();
  await I.welshLanguageRequirement();
  await I.runSubmitAndPayHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });
