const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    respondent1Name: 'Mary Richards (Respondent)',
    requestSupportLink: '//a[contains(text(),\'Request support\')]'
  },
  async selectRA() {
    await I.retry(retryCount)
      .triggerEvent('Request support');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Who is the support for?');
  },
  async verifyRequestSupportLinkAppear() {
    await I.wait('3');
    await I.retry(retryCount).waitForElement(this.fields.requestSupportLink);
  }
};