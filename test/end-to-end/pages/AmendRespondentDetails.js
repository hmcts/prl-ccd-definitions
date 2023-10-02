const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    res1AddressKnown_Yes: '#respondents_0_isCurrentAddressKnown_Yes',
    res1AddressPostcode: 'respondents_0_address_address',
    res1IsAddressConfidential_Yes: '#respondents_0_isAddressConfidential_Yes',
    res1IsAddressConfidential_No: '#respondents_0_isAddressConfidential_No',
    res1ProvideEmailAdd_Yes: '#respondents_0_canYouProvideEmailAddress_Yes',
    res1EmailAdd: '#respondents_0_email',
    res1EmailAddConfidential_Yes: 'respondents_0_isEmailAddressConfidential_Yes',
    res1ProvideContactNum_Yes: '#respondents_0_canYouProvidePhoneNumber_Yes',
    res1ContactNum: '#respondents_0_phoneNumber',
    res1ContactNumConfidential_Yes: '#respondents_0_isPhoneNumberConfidential_Yes',
    res2ProvideEmailAdd_Yes: '#respondents_1_canYouProvideEmailAddress_Yes',
    res2EmailAdd: '#respondents_1_email',
    res2EmailAddConfidential_Yes: 'respondents_1_isEmailAddressConfidential_Yes',
    res2ProvideContactNum_Yes: '#respondents_1_canYouProvidePhoneNumber_Yes',
    res2ContactNum: '#respondents_1_phoneNumber',
    res2ContactNumConfidential_Yes: '#respondents_1_isPhoneNumberConfidential_Yes'
  },
  async updateRespondentsDetailsConfidential() {
    await I.retry(retryCount).triggerEvent('Amend respondent details');
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.res1AddressKnown_Yes);
    await I.wait('3');
    await I.selectPostCodeLookupAddress(this.fields.res1AddressPostcode, 'TW7 5AS');
    await I.wait('3');
    await I.retry(retryCount).click(this.fields.res1ProvideEmailAdd_Yes);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.res1EmailAdd, 'respondent1@test.com');
    await I.retry(retryCount).click(this.fields.res1EmailAddConfidential_Yes);
    await I.retry(retryCount).click(this.fields.res1ProvideContactNum_Yes);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.res1ContactNum, '09876543210');
    await I.retry(retryCount).click(this.fields.res1ContactNumConfidential_Yes);
    await I.retry(retryCount).click(this.fields.res2ProvideEmailAdd_Yes);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.res2EmailAdd, 'respondent2@test.com');
    await I.retry(retryCount).click(this.fields.res2EmailAddConfidential_Yes);
    await I.retry(retryCount).click(this.fields.res2ProvideContactNum_Yes);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.res2ContactNum, '07766554433');
    await I.retry(retryCount).click(this.fields.res2ContactNumConfidential_Yes);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
    await I.retry(retryCount).click('Save and continue');
    await I.wait('9');
  }
};