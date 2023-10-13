const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    respondent1Name: 'Mary Richards (Respondent)',
    requestSupportLink: '//a[contains(text(),\'Request support\')]',
    partyNameRadio: '#flag-location-',
    flagType: '#flag-type-0',
    reasonableAdjustmentRadio: '#flag-type-',
    raTypeOther: '#flag-type-7',
    raTypeOtherTextbox: '#other-flag-type-description',
    raSubType: '#flag-type-0',
    docAlternateFormatType: '#flag-type-0',
    moreAboutTextbox: '#flagComments'
  },
  async raiseSupportRequestForDocInAlternateType() {
    await I.retry(retryCount)
      .triggerEvent('Request support');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Who is the support for?');
    await this.selectRADocInAlternateType();
  },
  async raiseSupportRequestForOtherType() {
    await I.retry(retryCount)
      .triggerEvent('Request support');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Who is the support for?');
    await this.selectRAOther();
  },
  async raiseSupportRequestForGetIntoInandAroundBuilding() {
    await this.checkDetailsInSupportTab();
    await I.retry(retryCount)
      .triggerEvent('Request support');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Who is the support for?');
    await this.selectRAGetIntoInandAroundBuilding();
  },
  async selectRADocInAlternateType() {
    const partyEle = this.fields.partyNameRadio.concat(`${0}`);
    const raEle = this.fields.reasonableAdjustmentRadio.concat(`${0}`);
    const raSubTypeEle  = this.fields.reasonableAdjustmentRadio.concat(`${0}`);
    await this.selectPartySupportFor(partyEle);
    await this.selectSupportType();
    await this.selectReasonableAdjustment(raEle);
    await this.selectReasonableAdjustmentSubType(raSubTypeEle);
    await this.enterTellUsMore();
    await this.checkYourAnswer();
  },
  async selectRAOther() {
    // eslint-disable-next-line no-magic-numbers
    const partyEle = this.fields.partyNameRadio.concat(`${3}`);
    // eslint-disable-next-line no-magic-numbers
    const raEle = this.fields.reasonableAdjustmentRadio.concat(`${7}`);
    await this.selectPartySupportFor(partyEle);
    await this.selectSupportType();
    await this.selectReasonableAdjustment(raEle);
    await this.enterTellUsMore();
    await this.checkYourAnswer();
  },
  async selectRAGetIntoInandAroundBuilding() {
    // eslint-disable-next-line no-magic-numbers
    const partyEle = this.fields.partyNameRadio.concat(`${1}`);
    // eslint-disable-next-line no-magic-numbers
    const raEle = this.fields.reasonableAdjustmentRadio.concat(`${2}`);
    const raSubTypeEle = this.fields.reasonableAdjustmentRadio.concat(`${0}`);
    await this.selectPartySupportFor(partyEle);
    await this.selectSupportType();
    await this.selectReasonableAdjustment(raEle);
    await this.selectReasonableAdjustmentSubType(raSubTypeEle);
    await this.enterTellUsMore();
    await this.checkYourAnswer();
  },
  async verifyRequestSupportLinkAppear() {
    await I.wait('3');
    await I.retry(retryCount).waitForElement(this.fields.requestSupportLink);
  },
  async selectPartySupportFor(partID) {
    await I.waitForText('Who is the support for?');
    await this.verifyListOfParties();
    await I.wait('5');
    await I.retry(retryCount).click(partID);
    await I.wait('1');
    await I.retry(retryCount).click('Next');
    await I.wait('5');
  },
  async verifyListOfParties() {
    await I.waitForText('Mary Richards (Respondent)');
    await I.waitForText('Elise Lynn (Respondent)');
    await I.waitForText('David Carman (Respondent)');
    await I.waitForText('John Doe (Applicant)');
    await I.waitForText('Jeremy Anderson (Applicant)');
    await I.waitForText('Martina Graham (Applicant)');
    // await I.waitForText('');
    // await I.waitForText('');
    // await I.waitForText('');

  },
  async selectSupportType() {
    await I.waitForText('Select support type');
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.flagType);
    await I.wait('1');
    await I.retry(retryCount).click('Next');
    await I.wait('5');
  },
  async selectReasonableAdjustment(raElement) {
    await I.waitForText('Reasonable adjustment');
    await I.wait('2');
    await I.retry(retryCount).click(raElement);
    if (raElement === this.fields.raTypeOther) {
      await I.retry(retryCount).fillField(this.fields.raTypeOtherTextbox, 'TEST SUPPORT TYPE');
      await I.wait('2');
    }
    await I.wait('1');
    await I.retry(retryCount).click('Next');
    await I.wait('5');
  },
  async selectReasonableAdjustmentSubType(raSubType) {
    await I.wait('2');
    await I.retry(retryCount).click(raSubType);
    await I.wait('1');
    await I.retry(retryCount).click('Next');
    await I.wait('5');
  },
  async enterTellUsMore() {
    await I.waitForText('Tell us more about the request (optional)');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.moreAboutTextbox, 'MORE ABOUT THE RA REQUEST');
    await I.wait('3');
    await I.retry(retryCount).click('Next');
    await I.wait('5');
  },
  async checkYourAnswer() {
    await I.waitForText('Review support request');
    await I.retry(retryCount).click('Submit');
    await I.wait('5');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  },
  async checkDetailsInSupportTab() {
    await I.wait('3');
    const tab = 'Support';
    const tabSelector = `//*[@role="tab"]/div[text() = "${tab}"]`;
    await I.retry(retryCount).click(tabSelector);
    await I.waitForText('MORE ABOUT THE RA REQUEST');
    await I.wait('2');
  }

};