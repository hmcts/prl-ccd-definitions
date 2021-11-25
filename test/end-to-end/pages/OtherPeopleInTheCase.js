const I = actor();

module.exports = {
  fields: {
    headerText: 'Other people in the case',
    textareaText: 'Testing text area',
    submit: 'button[type="submit"]',
    otherPeopleAddress: 'OthersToNotify_0_Address_Address'
  },

  async otherPeopleInTheCase() {
    const retryCount = 3;
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.click('Add new');
    I.wait('1');
    await I.fillField('//input[@id="OthersToNotify_0_FirstName"]', 'Other Firstname');
    I.wait('2');
    await I.fillField('//input[@id="OthersToNotify_0_LastName"]', 'Other Lastname');
    await I.fillField('//input[@id="OthersToNotify_0_PreviousName"]', 'Other PreviousName');
    await I.retry(retryCount).checkOption('#OthersToNotify_0_IsDateOfBirthKnown_Yes');
    await I.fillField('//input[@id="DateOfBirth-day"]', '12');
    await I.fillField('//input[@id="DateOfBirth-month"]', '11');
    await I.fillField('//input[@id="DateOfBirth-year"]', '2007');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_Gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_IsCurrentAddressKnown_Yes"]');
    await I.selectPostCodeLookupAddress(this.fields.otherPeopleAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_CanYouProvideEmailAddress_Yes"]');
    await I.fillField('//input[@id="OthersToNotify_0_Email"]', 'otherstonotify@email.com');
    await I.retry(retryCount).checkOption('//input[@id="OthersToNotify_0_CanYouProvidePhoneNumber_Yes"]');
    await I.fillField('//input[@id="OthersToNotify_0_PhoneNumber"]', '07122884667');
    await I.click('Continue');
    await I.waitForText('Submit', '30');
    await I.click('Submit');
  }

};