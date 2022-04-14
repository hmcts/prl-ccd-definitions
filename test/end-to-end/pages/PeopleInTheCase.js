const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    applicantAddress: 'applicants_0_address_Address',
    childrenAddress: 'childrenAddress_childrenAddress',
    respondentAddress: 'respondents_0_address_Address',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('People in the case');
  },

  async fillWhereChildrenLivePage() {
    await I.retry(retryCount).selectPostCodeLookupAddress(this.fields.childrenAddress, 'B11LS');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillChildrenAdditionalQuestionsPage() {
    I.wait('2');
    await I.retry(retryCount).waitForElement('//input[@id="isChildrenKnownToAuthority-yes"]');
    await I.runAccessibilityTest();
    await I.retry(retryCount).checkOption('//input[@id="isChildrenKnownToAuthority-yes"]');
    await I.retry(retryCount).waitForElement('//textarea[@id="childAndLocalAuthority"]');
    await I.retry(retryCount).fillField('//textarea[@id="childAndLocalAuthority"]', 'Test local authority');
    await I.retry(retryCount).checkOption('//input[@id="isChildrenUnderChildProtection-yes"]');
    await I.retry(retryCount).checkOption('//input[@id="isChildrenWithSameParents-no"]');
    await I.retry(retryCount).waitForElement('//textarea[@id="parentsAndTheirChildren"]');
    await I.retry(retryCount).fillField('//textarea[@id="parentsAndTheirChildren"]', 'Parent 1: Child 1');
    await I.retry(retryCount).fillField('//textarea[@id="parentalResponsibilities"]', 'Responsibility: Parent 1');
    await I.retry(retryCount).checkOption('//input[@id="whoChildrenLiveWith-other"]');
    await I.retry(retryCount).waitForElement('//textarea[@id="childAddressAndAdultsLivingWith"]');
    await I.retry(retryCount).fillField('//textarea[@id="childAddressAndAdultsLivingWith"]', '3 address of child, England');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillOtherCourtCasesPage() {
    await I.retry(retryCount).waitForElement('//input[@id="isExistingProceedings_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="isExistingProceedings_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="childrenInProceeding"]', 'Child 1, Child 2');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillOtherChildren() {
    await I.retry(retryCount).waitForElement('#otherChildren');
    await I.retry(retryCount).click('Add new');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField('//input[@id="otherChildren_0_firstName"]', 'Test Firstname');
    await I.retry(retryCount).fillField('//input[@id="otherChildren_0_lastName"]', 'Test Lastname');
    await I.retry(retryCount).checkOption('//input[@id="otherChildren_0_isDateOfBirthUnknown-dontKnow"]');
    await I.retry(retryCount).checkOption('//input[@id="otherChildren_0_gender-female"]');
    await I.retry(retryCount).fillField('//input[@id="otherChildren_0_relationshipToApplicant"]', 'Son');
    await I.retry(retryCount).fillField('//input[@id="otherChildren_0_relationshipToRespondent"]', 'Nephew');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runEventHappyPath() {
    await this.triggerEvent();
    await this.fillWhereChildrenLivePage();
    await this.fillChildrenAdditionalQuestionsPage();
    await this.fillOtherCourtCasesPage();
    await this.fillOtherChildren();
    await I.retry(retryCount).submitEvent();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
