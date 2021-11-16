const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    applicantAddress: 'Applicants_0_Address_Address'
  },

  async triggerEvent() {
    await I.triggerEvent('Applicant details');
  },

  async fillApplicantsPage() {
    const retryCount = 3;
    I.wait('2');
    await I.click('Add new');
    await I.fillField('//input[@id="Applicants_0_FirstName"]', 'Applicant Firstname');
    I.wait('2');
    await I.fillField('//input[@id="Applicants_0_LastName"]', 'Applicant Lastname');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-month"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-year"]', '1990');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_Gender-male"]');
    await I.fillField('//input[@id="Applicants_0_PlaceOfBirth"]', 'London');
    await I.selectPostCodeLookupAddress(this.fields.applicantAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsAtAddressLessThan5Years_Yes"]');
    I.wait('1');
    await I.retry(retryCount).fillField('//*[@id="Applicants_0_AddressLivedLessThan5YearsDetails"]', 'Same address for last 5 years');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_CanYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="Applicants_0_Email"]', 'applicant@gmail.com');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="Applicants_0_PhoneNumber"]', '4334646456456');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsPhoneNumberConfidential_Yes"]');
    await I.click(this.fields.submit);
  },

  async runApplicantDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillApplicantsPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
