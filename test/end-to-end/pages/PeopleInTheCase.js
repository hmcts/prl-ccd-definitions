const I = actor();

module.exports = {

  fields: {
    applicantAddress: 'applicants_0_address_Address',
    childrenAddress: 'childrenAddress_childrenAddress',
    respondentAddress: 'respondents_0_address_Address',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.retry(3).triggerEvent('People in the case');
  },

  async fillWhereChildrenLivePage() {
    await I.retry(3).selectPostCodeLookupAddress(this.fields.childrenAddress, 'B11LS');
    await I.retry(3).click(this.fields.submit);
  },

  async fillChildrenAdditionalQuestionsPage() {
    I.wait('2');
    await I.retry(3).waitForElement('//input[@id="isChildrenKnownToAuthority-yes"]');
    await I.retry(3).checkOption('//input[@id="isChildrenKnownToAuthority-yes"]');
    await I.retry(3).waitForElement('//textarea[@id="childAndLocalAuthority"]');
    await I.retry(3).fillField('//textarea[@id="childAndLocalAuthority"]', 'Test local authority');
    await I.retry(3).checkOption('//input[@id="isChildrenUnderChildProtection-yes"]');
    await I.retry(3).checkOption('//input[@id="isChildrenWithSameParents-no"]');
    await I.retry(3).waitForElement('//textarea[@id="parentsAndTheirChildren"]');
    await I.retry(3).fillField('//textarea[@id="parentsAndTheirChildren"]', 'Parent 1: Child 1');
    await I.retry(3).fillField('//textarea[@id="parentalResponsibilities"]', 'Responsibility: Parent 1');
    await I.retry(3).checkOption('//input[@id="whoChildrenLiveWith-other"]');
    await I.retry(3).waitForElement('//textarea[@id="childAddressAndAdultsLivingWith"]');
    await I.retry(3).fillField('//textarea[@id="childAddressAndAdultsLivingWith"]', '3 address of child, England');
    await I.retry(3).click(this.fields.submit);
  },

  async fillOtherCourtCasesPage() {
    await I.retry(3).waitForElement('//input[@id="isExistingProceedings_Yes"]');
    await I.retry(3).checkOption('//input[@id="isExistingProceedings_Yes"]');
    await I.retry(3).fillField('//input[@id="childrenInProceeding"]', 'Child 1, Child 2');
    I.wait('2');
    await I.retry(3).click(this.fields.submit);
  },

  async fillOtherChildren() {
    const retryCount = 3;
    await I.retry(3).waitForElement('#otherChildren');
    await I.retry(3).click('Add new');
    await I.retry(3).fillField('//input[@id="otherChildren_0_firstName"]', 'Test Firstname');
    await I.retry(3).fillField('//input[@id="otherChildren_0_lastName"]', 'Test Lastname');
    await I.retry(3).checkOption('//input[@id="otherChildren_0_isDateOfBirthUnknown-dontKnow"]');
    await I.retry(3).checkOption('//input[@id="otherChildren_0_gender-female"]');
    await I.retry(3).fillField('//input[@id="otherChildren_0_relationshipToApplicant"]', 'Son');
    await I.retry(3).fillField('//input[@id="otherChildren_0_relationshipToRespondent"]', 'Nephew');
    await I.retry(3).click(this.fields.submit);
  },

  async runEventHappyPath() {
    await this.triggerEvent();
    await this.fillWhereChildrenLivePage();
    await this.fillChildrenAdditionalQuestionsPage();
    await this.fillOtherCourtCasesPage();
    await this.fillOtherChildren();
    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};
