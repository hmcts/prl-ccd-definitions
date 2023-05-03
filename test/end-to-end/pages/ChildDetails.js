const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    child1FirstName: '//*[@id="newChildDetails_0_firstName"]',
    child1LastName: '//*[@id="newChildDetails_0_lastName"]',
    child2FirstName: '//*[@id="newChildDetails_1_firstName"]',
    child2LastName: '//*[@id="newChildDetails_1_lastName"]',
    parentalResponsibilityDetails: '//*[@id="newChildDetails_0_parentalResponsibilityDetails"]',
    parentalResponsibilityDetails2: '//*[@id="newChildDetails_1_parentalResponsibilityDetails"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Child details');
  },
  async fillChildrenPage() {
    await I.waitForText('Child details');
    await I.retry(retryCount).click('Add new');
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.child1FirstName, 'Test Firstname1');
    await I.retry(retryCount).fillField(this.fields.child1LastName, 'Test Lastname1');
    await I.retry(retryCount).fillField('(//input[@id="dateOfBirth-day"])[1]', '11');
    I.wait('1');
    await I.retry(retryCount).fillField('(//input[@id="dateOfBirth-month"])[1]', '11');
    I.wait('1');
    await I.retry(retryCount).fillField('(//input[@id="dateOfBirth-year"])[1]', '2012');
    await I.retry(retryCount).checkOption('//input[@id="newChildDetails_0_gender-female"]');
    await I.retry(retryCount).checkOption('//input[@id="newChildDetails_0_orderAppliedFor-childArrangementsOrder"]');
    await I.retry(retryCount).fillField(this.fields.parentalResponsibilityDetails, 'Text area field Test');
    await this.addNewChild2();
  },

  async addNewChild2() {
    await I.retry(retryCount).click('Add new');
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.child2FirstName, 'Test Firstname2');
    await I.retry(retryCount).fillField(this.fields.child2LastName, 'Test Lastname2');
    await I.retry(retryCount).fillField('(//input[@id="dateOfBirth-day"])[2]', '11');
    I.wait('1');
    await I.retry(retryCount).fillField('(//input[@id="dateOfBirth-month"])[2]', '11');
    I.wait('1');
    await I.retry(retryCount).fillField('(//input[@id="dateOfBirth-year"])[2]', '2015');
    await I.retry(retryCount).checkOption('//input[@id="newChildDetails_1_gender-female"]');
    await I.retry(retryCount).checkOption('//input[@id="newChildDetails_1_orderAppliedFor-childArrangementsOrder"]');
    await I.retry(retryCount).fillField(this.fields.parentalResponsibilityDetails2, 'Text area field Test');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async fillAdditionalQuestionsPage() {
    await I.retry(retryCount).waitForText('Are any of the children known to the local authority children\'s services? (Optional)');
    await I.retry(retryCount).checkOption('//input[@id="childrenKnownToLocalAuthority-yes"]');
    I.wait('1');
    await I.retry(retryCount).fillField('#childrenKnownToLocalAuthorityTextArea', 'Text Area');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="childrenSubjectOfChildProtectionPlan-yes"]');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runChildDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillChildrenPage();
    await this.fillAdditionalQuestionsPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};