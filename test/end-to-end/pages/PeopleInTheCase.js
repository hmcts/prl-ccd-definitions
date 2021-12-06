const I = actor();

module.exports = {

  fields: {
    applicantAddress: 'Applicants_0_Address_Address',
    childrenAddress: 'ChildrenAddress_ChildrenAddress',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.triggerEvent('People in the case');
  },

  async fillWhereChildrenLivePage() {
    await I.selectPostCodeLookupAddress(this.fields.childrenAddress, 'B11LS');
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
    await I.waitForElement('//input[@id="IsExistingProceedings_Yes"]');
    await I.checkOption('//input[@id="IsExistingProceedings_Yes"]');
    await I.fillField('//input[@id="ChildrenInProceeding"]', 'Child 1, Child 2');
    I.wait('2');
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
    await this.fillChildrenAdditionalQuestionsPage();
    await this.fillOtherCourtCasesPage();
    await this.fillOtherChildren();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};