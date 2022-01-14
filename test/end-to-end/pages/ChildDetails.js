const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area'
  },

  async triggerEvent() {
    await I.triggerEvent('Child details');
  },

  async fillChildrenDetailsPage() {
    const retryCount = 3;
    await I.waitForElement('#children');
    await I.click('Add new');
    await I.fillField('//input[@id="children_0_firstName"]', 'Test Firstname');
    await I.fillField('//input[@id="children_0_lastName"]', 'Test Lastname');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '11');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '2005');
    await I.retry(retryCount).checkOption('//input[@id="children_0_gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="children_0_orderAppliedFor-childArrangementsOrder"]');
    await I.retry(retryCount).checkOption('//input[@id="children_0_applicantsRelationshipToChild-stepFather"]');
    await I.retry(retryCount).checkOption('//input[@id="children_0_respondentsRelationshipToChild-mother"]');
    await I.retry(retryCount).checkOption('//input[@id="children_0_childLiveWith-applicant"]');
    await I.fillField('//textarea[@id="children_0_parentalResponsibilityDetails"]', 'Text area field Test');
  },
  
  async fillAdditionalDetailsChildrenPage() {
    const retryCount = 3;
    await I.click(this.fields.submit);
    await I.retry(retryCount).checkOption('//input[@id="childrenKnownToLocalAuthority-yes"]');
    await I.wait('1');
    await I.retry(retryCount).fillField('//textarea[@id="childrenKnownToLocalAuthorityTextArea"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//input[@id="childrenSubjectOfChildProtectionPlan-yes"]');
    await I.wait('1');
    await I.click(this.fields.submit);
  },

  async runChildDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillChildrenDetailsPage();
    //PRL-686 Adding two children to test Other people in the case event
    await this.fillChildrenDetailsPage();
    await this.fillAdditionalDetailsChildrenPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
