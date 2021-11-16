const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Child details');
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
    await I.retry(retryCount).checkOption('//input[@id="Children_0_ApplicantsRelationshipToChild-StepFather"]');
    await I.retry(retryCount).checkOption('//input[@id="Children_0_RespondentsRelationshipToChild-Mother"]');
    await I.retry(retryCount).checkOption('//input[@id="Children_0_ChildLiveWith-Applicant"]');
    await I.click(this.fields.submit);
  },

  async runChildDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillChildrenPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
