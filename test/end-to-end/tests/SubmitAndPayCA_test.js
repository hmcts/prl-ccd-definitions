const testConfig = require('../config');

Feature('CA Submit and Pay');
Scenario('Create a Case and Submit/Pay @regression-suite @ptl-regression @preview-regression', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.typeOfApplicationEventC100();
  await I.hearingUrgency();
  await I.applicantDetailsC100();
  await I.respondentDetailsC100();
  await I.otherPeopleInTheCase();
  await I.childDetails();
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
  await I.runSubmitAndPayHappyPath();
}).retry(testConfig.TestRetryScenarios);
