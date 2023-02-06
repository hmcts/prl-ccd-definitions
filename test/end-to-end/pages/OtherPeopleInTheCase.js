const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Other people in the case',
    textareaText: 'Testing text area',
    submit: 'button[type="submit"]',
    otherPeopleAddress: 'othersToNotify_0_address_address'
  },

  async otherPeopleInTheCase() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).click('Add new');
    I.wait('1');
    await I.retry(retryCount).fillField('//input[@id="othersToNotify_0_firstName"]', 'Other Firstname');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="othersToNotify_0_lastName"]', 'Other Lastname');
    await I.retry(retryCount).fillField('//input[@id="othersToNotify_0_previousName"]', 'Other PreviousName');
    await I.retry(retryCount).checkOption('#othersToNotify_0_isDateOfBirthKnown_Yes');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '12');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '2007');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_isPlaceOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="othersToNotify_0_placeOfBirth"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_isCurrentAddressKnown_Yes"]');
    await I.retry(retryCount).selectPostCodeLookupAddress(this.fields.otherPeopleAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_isAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="othersToNotify_0_email"]', 'otherstonotify@email.com');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_isEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_canYouProvidePhoneNumber_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="othersToNotify_0_phoneNumber"]', '07122884667');
    await I.retry(retryCount).checkOption('//input[@id="othersToNotify_0_isPhoneNumberConfidential_Yes"]');
    I.wait('2');
    await I.retry(retryCount).click('Continue');
    await I.retry(retryCount).waitForText('Save and continue', '10');
    await I.retry(retryCount).click('Save and continue');
  }

};