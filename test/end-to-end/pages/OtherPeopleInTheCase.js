const I = actor();

module.exports = {
  fields: {
    headerText: 'Other people in the case',
    textareaText: 'Testing text area',
    submit: 'button[type="submit"]',
    otherPeopleAddress: 'othersToNotify_0_address_address'
  },

  async otherPeopleInTheCase() {
    const retryCount = 3;
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.click('Add new');
    I.wait('1');
    await I.fillField('//input[@id="othersToNotify_0_firstName"]', 'Other Firstname');
    I.wait('2');
    await I.fillField('//input[@id="othersToNotify_0_lastName"]', 'Other Lastname');
    await I.fillField('//input[@id="othersToNotify_0_previousName"]', 'Other PreviousName');
    await I.retry(retryCount).checkOption('#othersToNotify_0_isDateOfBirthKnown_Yes');
    await I.fillField('//input[@id="dateOfBirth-day"]', '12');
    await I.fillField('//input[@id="dateOfBirth-month"]', '11');
    await I.fillField('//input[@id="dateOfBirth-year"]', '2007');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_isCurrentAddressKnown_Yes"]');
    await I.selectPostCodeLookupAddress(this.fields.otherPeopleAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_canYouProvideEmailAddress_Yes"]');
    await I.fillField('//input[@id="othersToNotify_0_email"]', 'otherstonotify@email.com');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_canYouProvidePhoneNumber_Yes"]');
    await I.fillField('//input[@id="othersToNotify_0_phoneNumber"]', '07122884667');
    await I.click('Continue');
    await I.waitForText('Submit', '30');
    await I.click('Submit');
  }

};