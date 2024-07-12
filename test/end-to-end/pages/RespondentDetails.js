const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Respondent details',
    textareaText: 'Respondent details',
    respondentAddress: 'respondents_0_address_address',
    respondentAddressFL401: 'respondentsFL401_address_address',
    submit: 'button[type="submit"]',
    organisation: 'AAT',
    res1AddressKnown_Yes: '#respondents_0_isCurrentAddressKnown_Yes',
    res1IsAddressConfidential_Yes: '#respondents_0_isAddressConfidential_Yes',
    res1IsAddressConfidential_No: '#respondents_0_isAddressConfidential_No',
    res1ProvideEmailAdd_Yes: '#respondents_0_canYouProvideEmailAddress_Yes',
    res1EmailAdd: '#respondents_0_email',
    res1EmailAddConfidential_Yes: '#respondents_0_isEmailAddressConfidential_Yes',
    res1ProvideContactNum_Yes: '#respondents_0_canYouProvidePhoneNumber_Yes',
    res1ContactNum: '#respondents_0_phoneNumber',
    res1ContactNumConfidential_Yes: '#respondents_0_isPhoneNumberConfidential_Yes',
    res2ProvideEmailAdd_Yes: '#respondents_1_canYouProvideEmailAddress_Yes',
    res2EmailAdd: '#respondents_1_email',
    res2EmailAddConfidential_Yes: '#respondents_1_isEmailAddressConfidential_Yes',
    res2ProvideContactNum_Yes: '#respondents_1_canYouProvidePhoneNumber_Yes',
    res2ContactNum: '#respondents_1_phoneNumber',
    res2ContactNumConfidential_Yes: '#respondents_1_isPhoneNumberConfidential_Yes',
    res3EmailAddConfidential_Yes: '#respondents_2_isEmailAddressConfidential_Yes'
  },

  async searchAndSelectGivenRegisteredOrganisation() {
    await I.retry(retryCount).waitForEnabled('#search-org-text');
    await I.retry(retryCount).wait('2');
    await I.retry(retryCount).fillField('#search-org-text', this.fields.organisation);
    await I.retry(retryCount).wait('2');
    // await I.retry(retryCount).click(locate('a').withText('Select')
    //   .inside(locate('#organisation-table').withDescendant(locate('h3').withText(this.fields.organisation))));
    await I.retry(retryCount).click(locate('a').withText('Select')
      .inside(locate('#organisation-table')));
  },

  async respondentDetailsC100() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    // I.wait('2');
    await I.click('Add new');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_firstName"]', 'Respondent Firstname');
    // I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_lastName"]', 'Respondent Lastname');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isDateOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    // I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '1995');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isPlaceOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_placeOfBirth"]', 'Birmingham');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isCurrentAddressKnown_Yes"]');
    await I.retry(retryCount).selectPostCodeLookupAddress(this.fields.respondentAddress, 'B11LS');
    // I.wait('2');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isAtAddressLessThan5YearsWithDontKnow-yes"]');
    await I.retry(retryCount).fillField('#respondents_0_addressLivedLessThan5YearsDetails', 'Text area');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_email"]', 'respondent@email.com');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_canYouProvidePhoneNumber_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_phoneNumber"]', '0712234667');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_doTheyHaveLegalRepresentation-yes"]');
    // I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_representativeFirstName"]', 'Ted');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_representativeLastName"]', 'Robinson');
    await I.retry(retryCount).fillField('//input[@id="respondents_0_solicitorEmail"]', 'test@example.com');
    await this.searchAndSelectGivenRegisteredOrganisation();
    // I.wait('2');
    await I.retry(retryCount).waitForText('Continue', '30');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Save and continue', '30');
    await I.retry(retryCount).click('Save and continue');
  },

  async respondentDetailsFL401() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="respondentsFL401_firstName"]', 'Respondent Firstname');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="respondentsFL401_lastName"]', 'Respondent Lastname');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_isDateOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '1995');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_respondentLivedWithApplicant_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_isCurrentAddressKnown_Yes"]');
    await I.retry(retryCount).selectPostCodeLookupAddress(this.fields.respondentAddressFL401, 'B11LS');
    I.wait('2');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="respondentsFL401_email"]', 'respondentFL401@email.com');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_canYouProvidePhoneNumber_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="respondentsFL401_phoneNumber"]', '0712234667');
    I.wait('2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Save and continue', '30');
    await I.retry(retryCount).click('Save and continue');
  },
  async updateRespondentsDetailsConfidential() {
    await I.retry(retryCount).triggerEvent('Amend respondent details');
    await I.wait('5');
    await I.retry(retryCount).checkOption(this.fields.res1AddressKnown_Yes);
    await I.wait('2');
    await I.selectPostCodeLookupAddress(this.fields.respondentAddress, 'TW75AS');
    await I.wait('3');
    await I.retry(retryCount).checkOption(this.fields.res1IsAddressConfidential_Yes);
    await I.wait('2');
    await I.retry(retryCount).checkOption(this.fields.res1ProvideEmailAdd_Yes);
    await I.wait('5');
    await I.retry(retryCount).fillField(this.fields.res1EmailAdd, 'respondent1@test.com');
    await I.retry(retryCount).checkOption(this.fields.res1EmailAddConfidential_Yes);
    await I.retry(retryCount).checkOption(this.fields.res1ProvideContactNum_Yes);
    await I.wait('5');
    await I.retry(retryCount).fillField(this.fields.res1ContactNum, '09876543210');
    await I.retry(retryCount).checkOption(this.fields.res1ContactNumConfidential_Yes);
    await I.retry(retryCount).checkOption(this.fields.res2ProvideEmailAdd_Yes);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.res2EmailAdd, 'respondent2@test.com');
    await I.retry(retryCount).checkOption(this.fields.res2EmailAddConfidential_Yes);
    await I.retry(retryCount).checkOption(this.fields.res2ProvideContactNum_Yes);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.res2ContactNum, '07766554433');
    await I.retry(retryCount).checkOption(this.fields.res2ContactNumConfidential_Yes);
    await I.retry(retryCount).checkOption(this.fields.res3EmailAddConfidential_Yes);
    await I.wait('2');
    await I.retry(retryCount).continueEvent();
    await I.wait('5');
    await I.retry(retryCount).click('Save and continue');
    await I.wait('9');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
