const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Other people in the case',
    textareaText: 'Testing text area',
    submit: 'button[type="submit"]',

    // Other Person Details
    opFirstName: '//input[@id="otherPartyInTheCaseRevised_0_firstName"]',
    opLastName: '//input[@id="otherPartyInTheCaseRevised_0_lastName"]',
    opPreviousName: '//input[@id="otherPartyInTheCaseRevised_0_previousName"]',
    opDateOfBirthKnown: '#otherPartyInTheCaseRevised_0_isDateOfBirthKnown_Yes',
    dobDay: '//input[@id="dateOfBirth-day"]',
    dobMonth: '//input[@id="dateOfBirth-month"]',
    dobYear: '//input[@id="dateOfBirth-year"]',
    opGenderMale: '//input[@id="otherPartyInTheCaseRevised_0_gender-male"]',
    opPlaceOfBirthKnownYes: '//input[@id="otherPartyInTheCaseRevised_0_isPlaceOfBirthKnown_Yes"]',
    opPlaceOfBirthDetails: '//input[@id="otherPartyInTheCaseRevised_0_placeOfBirth"]',
    opCurrentAddressKnownYes: '//input[@id="otherPartyInTheCaseRevised_0_isCurrentAddressKnown_Yes"]',
    opCurrentAddressKnownNo: '//input[@id="otherPartyInTheCaseRevised_0_isCurrentAddressKnown_No"]',
    opLivesInRefugeYes: '//input[@id="otherPartyInTheCaseRevised_0_liveInRefuge_Yes"]',
    otherPeopleAddress: 'otherPartyInTheCaseRevised_0_address_address',
    opIsAddressConfidentialYes: '//input[@id="otherPartyInTheCaseRevised_0_isAddressConfidential_Yes"]',
    opIsAddressConfidentialNo: '//input[@id="otherPartyInTheCaseRevised_0_isAddressConfidential_No"]',
    opLivedLessThan5Years: '//input[@id="otherPartyInTheCaseRevised_0_isAtAddressLessThan5Years_Yes"]',
    opPreviousAddressDetails: '//*[@id="otherPartyInTheCaseRevised_0_addressLivedLessThan5YearsDetails"]',
    opProvideEmailAddressYes: '//input[@id="otherPartyInTheCaseRevised_0_canYouProvideEmailAddress_Yes"]',
    opEmail: '//input[@id="otherPartyInTheCaseRevised_0_email"]',
    opEmailConfidentialYes: '//input[@id="otherPartyInTheCaseRevised_0_isEmailAddressConfidential_Yes"]',
    opProvidePhoneNoYes: '//input[@id="otherPartyInTheCaseRevised_0_canYouProvidePhoneNumber_Yes"]',
    opPhoneNo: '//input[@id="otherPartyInTheCaseRevised_0_phoneNumber"]',
    opPhoneNoConfidentialYes: '//input[@id="otherPartyInTheCaseRevised_0_isPhoneNumberConfidential_Yes"]',
    opUploadC8RefugeForm: 'otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form'
  },

  async otherPeopleInTheCase() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.waitForText('Add new');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).fillField(this.fields.opFirstName, 'Other Firstname');
    await I.retry(retryCount).fillField(this.fields.opLastName, 'Other Lastname');
    await I.retry(retryCount).fillField(this.fields.opPreviousName, 'Other PreviousName');
    await I.retry(retryCount).checkOption(this.fields.opDateOfBirthKnown);
    await I.retry(retryCount).fillField(this.fields.dobDay, '12');
    await I.retry(retryCount).fillField(this.fields.dobMonth, '11');
    await I.retry(retryCount).fillField(this.fields.dobYear, '2007');
    await I.retry(retryCount).checkOption(this.fields.opGenderMale);
    await I.retry(retryCount).checkOption(this.fields.opPlaceOfBirthKnownYes);
    await I.retry(retryCount).fillField(this.fields.opPlaceOfBirthDetails, this.fields.textareaText);
    await I.retry(retryCount).checkOption(this.fields.opCurrentAddressKnownYes);
    await I.retry(retryCount).checkOption(this.fields.opLivesInRefugeYes);
    await I.retry(retryCount).attachDocument(this.fields.opUploadC8RefugeForm);
    await I.wait('7');
    await I.retry(retryCount).selectPostCodeLookupAddress(this.fields.otherPeopleAddress, 'B11LS');
    await I.retry(retryCount).checkOption(this.fields.opIsAddressConfidentialYes);
    await I.retry(retryCount).checkOption(this.fields.opLivedLessThan5Years);
    await I.retry(retryCount).fillField(this.fields.opPreviousAddressDetails, '123 Previous Address 4567');
    await I.retry(retryCount).checkOption(this.fields.opProvideEmailAddressYes);
    await I.retry(retryCount).fillField(this.fields.opEmail, 'otherstonotify@email.com');
    await I.retry(retryCount).checkOption(this.fields.opEmailConfidentialYes);
    await I.retry(retryCount).checkOption(this.fields.opProvidePhoneNoYes);
    await I.retry(retryCount).fillField(this.fields.opPhoneNo, '07122884667');
    await I.retry(retryCount).checkOption(this.fields.opPhoneNoConfidentialYes);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Save and continue', '10');
    await I.retry(retryCount).click('Save and continue');
  }
};