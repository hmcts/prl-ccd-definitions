const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Other people in the case',
    textareaText: 'Testing text area',
    otherPeopleAddress: 'otherPartyInTheCaseRevised_0_address_address',
    submit: 'button[type="submit"]',
  },

  async triggerEvent() {
    await I.triggerEvent('Other people in the case');
  },


  async otherPeopleInTheCase() {
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).click('Add new');
    I.wait('1');
    await I.retry(retryCount).fillField('//input[@id="otherPartyInTheCaseRevised_0_firstName"]', 'Other Firstname');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="otherPartyInTheCaseRevised_0_lastName"]', 'Other Lastname');
    await I.retry(retryCount).fillField('//input[@id="otherPartyInTheCaseRevised_0_previousName"]', 'Other PreviousName');
    await I.retry(retryCount).checkOption('#otherPartyInTheCaseRevised_0_isDateOfBirthKnown_Yes');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '12');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '2007');
    await I.retry(retryCount).checkOption('//input[@id="otherPartyInTheCaseRevised_0_gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="otherPartyInTheCaseRevised_0_isPlaceOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="otherPartyInTheCaseRevised_0_placeOfBirth"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//input[@id="otherPartyInTheCaseRevised_0_isCurrentAddressKnown_Yes"]');
    await I.retry(retryCount).selectPostCodeLookupAddress(this.fields.otherPeopleAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="otherPartyInTheCaseRevised_0_isAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="otherPartyInTheCaseRevised_0_isAtAddressLessThan5Years_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="otherPartyInTheCaseRevised_0_addressLivedLessThan5YearsDetails"]', 'Same address for last 5 years');
    await I.retry(retryCount).checkOption('//*[@id="otherPartyInTheCaseRevised_0_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="otherPartyInTheCaseRevised_0_email"]', 'otherstonotify@email.com');
    await I.retry(retryCount).checkOption('//*[@id="otherPartyInTheCaseRevised_0_isEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="otherPartyInTheCaseRevised_0_canYouProvidePhoneNumber_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="otherPartyInTheCaseRevised_0_phoneNumber"]', '07122884667');
    await I.retry(retryCount).checkOption('//*[@id="otherPartyInTheCaseRevised_0_isPhoneNumberConfidential_Yes"]');
    await I.retry(retryCount).waitForText('Continue', '10');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runOtherPeopleInTheCase() {
    await this.triggerEvent();
    await this.otherPeopleInTheCase();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};