const I = actor();

module.exports = {
  fields: {
    headerText: 'Respondent details',
    textareaText: 'Respondent details',
    respondentAddress: 'respondents_0_address_address',
    respondentAddressFL401: 'respondentsFL401_address_address',
    submit: 'button[type="submit"]',
    organisation: 'AAT'
  },

  async searchAndSelectGivenRegisteredOrganisation() {
    await I.waitForEnabled('#search-org-text');
    await I.wait('2');
    await I.fillField('#search-org-text', this.fields.organisation);
    await I.wait('2');
    await I.click(locate('a').withText('Select')
      .inside(locate('#organisation-table').withDescendant(locate('h3').withText(this.fields.organisation))));
  },

  async respondentDetailsC100() {
    const retryCount = 3;
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    I.wait('2');
    await I.click('Add new');
    await I.fillField('//input[@id="respondents_0_firstName"]', 'Respondent Firstname');
    I.wait('2');
    await I.fillField('//input[@id="respondents_0_lastName"]', 'Respondent Lastname');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isDateOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '1995');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_gender-male"]');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isPlaceOfBirthKnown_Yes"]');
    await I.fillField('//input[@id="respondents_0_placeOfBirth"]', 'Birmingham');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isCurrentAddressKnown_Yes"]');
    await I.selectPostCodeLookupAddress(this.fields.respondentAddress, 'B11LS');
    I.wait('2');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_isAtAddressLessThan5YearsWithDontKnow-yes"]');
    await I.fillField('#respondents_0_addressLivedLessThan5YearsDetails', 'Text area');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_canYouProvideEmailAddress_Yes"]');
    await I.fillField('//input[@id="respondents_0_email"]', 'respondent@email.com');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_canYouProvidePhoneNumber_Yes"]');
    await I.fillField('//input[@id="respondents_0_phoneNumber"]', '07122334667');
    await I.retry(retryCount).checkOption('//input[@id="respondents_0_doTheyHaveLegalRepresentation-yes"]');
    I.wait('2');
    await I.fillField('//input[@id="respondents_0_representativeFirstName"]', 'Ted');
    await I.fillField('//input[@id="respondents_0_representativeLastName"]', 'Robinson');
    await I.fillField('//input[@id="respondents_0_solicitorEmail"]', 'test@example.com');
    await this.searchAndSelectGivenRegisteredOrganisation();
    I.wait('2');
    await I.click('Continue');
    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  },

  async respondentDetailsFL401() {
    const retryCount = 3;
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    I.wait('2');
    await I.fillField('//input[@id="respondentsFL401_firstName"]', 'Respondent Firstname');
    I.wait('2');
    await I.fillField('//input[@id="respondentsFL401_lastName"]', 'Respondent Lastname');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_isDateOfBirthKnown_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '11');
    I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '1995');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_respondentLivedWithApplicant_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_isCurrentAddressKnown_Yes"]');
    await I.selectPostCodeLookupAddress(this.fields.respondentAddressFL401, 'B11LS');
    I.wait('2');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_isAtAddressLessThan5YearsWithDontKnow-yes"]');
    await I.fillField('#respondentsFL401_addressLivedLessThan5YearsDetails', 'Text area');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_canYouProvideEmailAddress_Yes"]');
    await I.fillField('//input[@id="respondentsFL401_email"]', 'respondentFL401@email.com');
    await I.retry(retryCount).checkOption('//input[@id="respondentsFL401_canYouProvidePhoneNumber_Yes"]');
    await I.fillField('//input[@id="respondentsFL401_phoneNumber"]', '07122334667');
    I.wait('2');
    await I.click('Continue');
    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  }
};
