const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    respondent1Name: 'Mary Richards (Respondent)',
    requestSupportLink: '//a[contains(text(),\'Request support\')]',
    party1NameRadio: '#flag-location-0',
    flagType: '#flag-type-0',
    raType: ' I need documents in an alternative format ',
    docAlternateFormatType: 'Documents in a specified colour',
    moreAboutTextbox: '#flagComments'
  },
  async selectRA() {
    await I.retry(retryCount)
      .triggerEvent('Request support');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Who is the support for?');
    await this.selectPartySupportFor();
    await this.selectSupportType();
    await this.selectReasonableAdjustment();
    await this.selectReasonableAdjustmentSubType();
    await this.enterTellUsMore();
    await this.checkYourAnswer();
  },
  async verifyRequestSupportLinkAppear() {
    await I.wait('3');
    await I.retry(retryCount).waitForElement(this.fields.requestSupportLink);
  },
  async selectPartySupportFor() {
    await I.waitForText('Who is the support for?');
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.party1NameRadio);
    await I.wait('9');
    await I.retry(retryCount).click('Next');
    await I.wait('9');
  },
  async selectSupportType() {
    await I.waitForText('Select support type');
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.flagType);
    await I.wait('9');
    await I.retry(retryCount).click('Next');
    await I.wait('9');
  },
  async selectReasonableAdjustment() {
    await I.waitForText('Reasonable adjustment');
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.raType);
    await I.wait('9');
    await I.retry(retryCount).click('Next');
    await I.wait('9');
  },
  async selectReasonableAdjustmentSubType() {
    await I.waitForText('Reasonable adjustment');
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.docAlternateFormatType);
    await I.wait('9');
    await I.retry(retryCount).click('Next');
    await I.wait('9');
  },
  async enterTellUsMore() {
    await I.waitForText('Tell us more about the request (optional)');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.moreAboutTextbox, 'MORE ABOUT THE RA REQUEST');
    await I.wait('9');
    await I.retry(retryCount).click('Next');
    await I.wait('9');
  },
  async checkYourAnswer() {
    await I.waitForText('Review support request');
    await I.retry(retryCount).click('Submit');
    await I.wait('9');
  }

};