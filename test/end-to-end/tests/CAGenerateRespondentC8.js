Feature('Court Admin Amend Respondent - Email, Address, Phone number - Confidential - C8 Generation - TS Solicitor Application');

Scenario(
  'Amend Respondent Email as Confidential @nightly',
  async I => {
    // await I.loginAsSolicitor();
    // await I.createCase();
    // await I.typeOfApplicationEventC100();
    // await I.hearingUrgency();
    // await I.childDetails();
    // await I.applicantDetailsC100();
    // await I.respondentDetailsC100();
    // await I.otherPeopleInTheCase();
    // await I.runOtherChildDetailsEvent();
    // await I.runChildrenAndApplicant();
    // await I.runChildrenAndRespondent();
    // await I.runChildrenAndOtherPeople();
    // await I.allegationsOfHarmEvent();
    // await I.runMIAMEventHappyPath();
    // await I.welshLanguageRequirement();
    // await I.runSubmitAndPayHappyPath();
    // await I.loginAsSolicitor();
    // await I.createCase_TS();
    // await I.runSubmitAndPayHappyPath();
    await I.loginAsCourtAdminTSSolicitorApplication();

    // await I.loginAsCourtAdmin();
    // await I.createC100CaseByCourtAdmin();
    await I.updateRespondentsDetailsConfidential();
  }
).retry({ retries: 3, minTimeout: 30000 });

