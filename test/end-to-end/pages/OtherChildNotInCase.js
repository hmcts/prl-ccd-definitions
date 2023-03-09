const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Other children not in the case',
    textareaText: 'Testing text area',
    submit: 'button[type="submit"]',
    otherChildGender: 'select[id="childrenNotInTheCase_0_gender"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Other children not in the case');
  },

  async otherChildNotInCase() {
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).checkOption('#childrenNotPartInTheCaseYesNo_Yes');
    I.wait('1');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).fillField('//input[@id="childrenNotInTheCase_0_firstName"]', 'OtherChild Firstname');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="childrenNotInTheCase_0_lastName"]', 'OtherChild Lastname');
    await I.retry(retryCount).selectOption(this.fields.otherChildGender, 'Female');
    await I.retry(retryCount).checkOption('#childrenNotInTheCase_0_isDateOfBirthKnown_Yes');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '12');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '2007');
    await I.retry(retryCount).waitForText('Continue', '10');
    await I.retry(retryCount).click('Continue');
  },

  async runOtherChildrenNotInCase() {
    await this.triggerEvent();
    await this.otherChildNotInCase();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};