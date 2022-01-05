const I = actor();

module.exports = {

  fields: {
    applicantAddress: 'applicants_0_address_Address',
    childrenAddress: 'childrenAddress_childrenAddress',
    respondentAddress: 'respondents_0_address_Address',
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
    await I.waitForElement('//input[@id="isChildrenKnownToAuthority-yes"]');
    await I.checkOption('//input[@id="isChildrenKnownToAuthority-yes"]');
    await I.waitForElement('//textarea[@id="childAndLocalAuthority"]');
    await I.fillField('//textarea[@id="childAndLocalAuthority"]', 'Test local authority');
    await I.checkOption('//input[@id="isChildrenUnderChildProtection-yes"]');
    await I.checkOption('//input[@id="isChildrenWithSameParents-no"]');
    await I.waitForElement('//textarea[@id="parentsAndTheirChildren"]');
    await I.fillField('//textarea[@id="parentsAndTheirChildren"]', 'Parent 1: Child 1');
    await I.fillField('//textarea[@id="parentalResponsibilities"]', 'Responsibility: Parent 1');
    await I.checkOption('//input[@id="whoChildrenLiveWith-other"]');
    await I.waitForElement('//textarea[@id="childAddressAndAdultsLivingWith"]');
    await I.fillField('//textarea[@id="childAddressAndAdultsLivingWith"]', '3 address of child, England');
    await I.click(this.fields.submit);
  },

  async fillOtherCourtCasesPage() {
    await I.waitForElement('//input[@id="isExistingProceedings_Yes"]');
    await I.checkOption('//input[@id="isExistingProceedings_Yes"]');
    await I.fillField('//input[@id="childrenInProceeding"]', 'Child 1, Child 2');
    I.wait('2');
    await I.click(this.fields.submit);
  },

  async fillOtherChildren() {
    const retryCount = 3;
    await I.waitForElement('#otherChildren');
    await I.click('Add new');
    await I.fillField('//input[@id="otherChildren_0_firstName"]', 'Test Firstname');
    await I.fillField('//input[@id="otherChildren_0_lastName"]', 'Test Lastname');
    await I.retry(retryCount).checkOption('//input[@id="otherChildren_0_isDateOfBirthUnknown-dontKnow"]');
    await I.retry(retryCount).checkOption('//input[@id="otherChildren_0_gender-female"]');
    await I.fillField('//input[@id="otherChildren_0_relationshipToApplicant"]', 'Son');
    await I.fillField('//input[@id="otherChildren_0_relationshipToRespondent"]', 'Nephew');
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
