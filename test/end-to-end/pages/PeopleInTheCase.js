const I = actor();

module.exports = {

  fields: {
    applicantAddress: 'Applicants_0_Address_Address',
    childrenAddress: 'ChildrenAddress_ChildrenAddress',
    respondentAddress: 'Respondents_0_Address_Address',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.triggerEvent('People in the case');
  },

  async fillWhereChildrenLivePage() {
    await I.selectPostCodeLookupAddress(this.fields.childrenAddress, 'B11LS');
    await I.click(this.fields.submit);
  },

  async fillChildrenPage() {
    const retryCount = 3;
    await I.waitForElement('#Children');
    await I.click('Add new');
    await I.fillField('//input[@id="Children_0_FirstName"]', 'Test Firstname');
    await I.fillField('//input[@id="Children_0_LastName"]', 'Test Lastname');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-day"]', '11');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-month"]', '11');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-year"]', '2005');
    await I.retry(retryCount).checkOption('//input[@id="Children_0_Gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="Children_0_OrderAppliedFor-childArrangementsOrder"]');
    await I.fillField('//input[@id="Children_0_RelationshipToApplicant"]', 'Mother');
    await I.fillField('//input[@id="Children_0_RelationshipToRespondent"]', 'Father');
    await I.click(this.fields.submit);
  },

  async fillChildrenAdditionalQuestionsPage() {
    I.wait('2');
    await I.waitForElement('//input[@id="IsChildrenKnownToAuthority-yes"]');
    await I.checkOption('//input[@id="IsChildrenKnownToAuthority-yes"]');
    await I.waitForElement('//textarea[@id="ChildAndLocalAuthority"]');
    await I.fillField('//textarea[@id="ChildAndLocalAuthority"]', 'Test local authority');
    await I.checkOption('//input[@id="IsChildrenUnderChildProtection-yes"]');
    await I.checkOption('//input[@id="IsChildrenWithSameParents-no"]');
    await I.waitForElement('//textarea[@id="ParentsAndTheirChildren"]');
    await I.fillField('//textarea[@id="ParentsAndTheirChildren"]', 'Parent 1: Child 1');
    await I.fillField('//textarea[@id="ParentalResponsibilities"]', 'Responsibility: Parent 1');
    await I.checkOption('//input[@id="WhoChildrenLiveWith-other"]');
    await I.waitForElement('//textarea[@id="ChildAddressAndAdultsLivingWith"]');
    await I.fillField('//textarea[@id="ChildAddressAndAdultsLivingWith"]', '3 address of child, England');
    await I.click(this.fields.submit);
  },

  async fillOtherCourtCasesPage() {
    const retryCount = 3;
    const uploadTime = 5;
    await I.waitForElement('//input[@id="IsExistingProceedings_Yes"]');
    await I.checkOption('//input[@id="IsExistingProceedings_Yes"]');
    await I.fillField('//input[@id="ChildrenInProceeding"]', 'Child 1, Child 2');
    I.wait('1');
    await I.click('Add new');
    await I.fillField('//input[@id="ExistingProceedings_0_CourtName"]', 'Court name');
    await I.fillField('//input[@id="ExistingProceedings_0_CaseNumber"]', 'TEST001');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_EmergencyProtectionOrder_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_SupervisionOrder_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_CaseOrder_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_ChildAbduction_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_FamilyLawAct_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_ContactOrderWithinProceedings_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_ContactOrderWithinAdoptionOrder_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_ChildMaintenanceOrder_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="ExistingProceedings_0_ChildArrangementsOrder_Yes"]');
    await I.attachFile('//input[@id="ExistingProceedings_0_ProceedingOrder"]', '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.click(this.fields.submit);
  },

  async fillApplicantsPage() {
    const retryCount = 3;
    I.wait('3');
    await I.click('#Applicants > div > button');
    I.wait('1');
    await I.fillField('//input[@id="Applicants_0_FirstName"]', 'Applicant Firstname');
    I.wait('2');
    await I.fillField('//input[@id="Applicants_0_LastName"]', 'Applicant Lastname');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-month"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-year"]', '1990');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_Gender-male"]');
    await I.fillField('//input[@id="Applicants_0_PlaceOfBirth"]', 'London');
    await I.selectPostCodeLookupAddress(this.fields.applicantAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsAtAddressLessThan5Years_Yes"]');
    await I.fillField('//input[@id="Applicants_0_Email"]', 'applicant@email.com');
    await I.fillField('//input[@id="Applicants_0_Landline"]', '02112344567');
    await I.fillField('//input[@id="Applicants_0_PhoneNumber"]', '07112344567');
    await I.click(this.fields.submit);
  },

  async fillHasAttendedMIAMPage() {
    await I.waitForElement('//input[@id="ApplicantAttendedMIAM_No"]');
    await I.checkOption('//input[@id="ApplicantAttendedMIAM_No"]');
    await I.waitForElement('//input[@id="ClaimingExemptionMIAM_Yes"]');
    await I.checkOption('//input[@id="ClaimingExemptionMIAM_Yes"]');
    await I.waitForElement('//input[@id="FamilyMediatorMIAM_Yes"]');
    await I.checkOption('//input[@id="FamilyMediatorMIAM_Yes"]');
    await I.click(this.fields.submit);
  },

  async fillMIAMCertificationPage() {
    await I.waitForElement('//input[@id="MediatorRegistrationNumber1"]');
    await I.fillField('//input[@id="MediatorRegistrationNumber1"]', 'URN12345');
    await I.fillField('//input[@id="FamilyMediatorServiceName1"]', 'Test service name');
    await I.fillField('//input[@id="SoleTraderName1"]', 'Test sole trader');
    await I.click(this.fields.submit);
  },

  async fillRespondentsPage() {
    const retryCount = 3;
    I.wait('3');
    await I.retry(retryCount).click('#Respondents > div > button');
    I.wait('2');
    await I.fillField('//input[@id="Respondents_0_FirstName"]', 'Respondent Firstname');
    I.wait('2');
    await I.fillField('//input[@id="Respondents_0_LastName"]', 'Respondent Lastname');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-month"]', '11');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-year"]', '1995');
    await I.retry(retryCount).checkOption('//input[@id="Respondents_0_Gender-male"]');
    await I.fillField('//input[@id="Respondents_0_PlaceOfBirth"]', 'Birmingham');
    await I.selectPostCodeLookupAddress(this.fields.respondentAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="Respondents_0_IsAtAddressLessThan5Years_Yes"]');
    await I.fillField('//input[@id="Respondents_0_Email"]', 'respondent@email.com');
    await I.fillField('//input[@id="Respondents_0_Landline"]', '02112236569');
    await I.fillField('//input[@id="Respondents_0_PhoneNumber"]', '07122334667');
    await I.click(this.fields.submit);
  },

  async fillOtherPeople() {
    const retryCount = 3;
    await I.waitForElement('#OthersToNotify');
    await I.click('Add new');
    I.wait('1');
    await I.fillField('//input[@id="OthersToNotify_0_FirstName"]', 'Other Firstname');
    I.wait('2');
    await I.fillField('//input[@id="OthersToNotify_0_LastName"]', 'Other Lastname');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_IsDateOfBirthUnknown-dontKnow"]');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_Gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_IsAddressUnknown-dontKnow"]');
    await I.fillField('//input[@id="OthersToNotify_0_Email"]', 'otherstonotify@email.com');
    await I.fillField('//input[@id="OthersToNotify_0_Landline"]', '02112233589');
    await I.fillField('//input[@id="OthersToNotify_0_PhoneNumber"]', '07122884667');
    await I.fillField('//textarea[@id="OthersToNotify_0_RelationshipToChildren"]', 'Uncle');
    await I.click(this.fields.submit);
  },

  async fillOtherChildren() {
    const retryCount = 3;
    await I.waitForElement('#OtherChildren');
    await I.click('Add new');
    await I.fillField('//input[@id="OtherChildren_0_FirstName"]', 'Test Firstname');
    await I.fillField('//input[@id="OtherChildren_0_LastName"]', 'Test Lastname');
    await I.retry(retryCount).checkOption('//input[@id="OtherChildren_0_IsDateOfBirthUnknown-dontKnow"]');
    await I.retry(retryCount).checkOption('//input[@id="OtherChildren_0_Gender-female"]');
    await I.fillField('//input[@id="OtherChildren_0_RelationshipToApplicant"]', 'Son');
    await I.fillField('//input[@id="OtherChildren_0_RelationshipToRespondent"]', 'Nephew');
    await I.click(this.fields.submit);
  },

  async runEventHappyPath() {
    await this.triggerEvent();
    await this.fillWhereChildrenLivePage();
    await this.fillChildrenPage();
    await this.fillChildrenAdditionalQuestionsPage();
    await this.fillOtherCourtCasesPage();
    await this.fillApplicantsPage();
    await this.fillHasAttendedMIAMPage();
    await this.fillMIAMCertificationPage();
    await this.fillRespondentsPage();
    await this.fillOtherPeople();
    await this.fillOtherChildren();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
