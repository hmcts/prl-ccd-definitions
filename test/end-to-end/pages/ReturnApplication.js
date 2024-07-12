const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    consentOrderNotProvided: 'input[id="rejectReason-consentOrderNotProvided"]',
    miamCertificateNotProvided: 'input[id="rejectReason-miamCertificateNotProvided"]',
    incompleteEvidenceOfMiamExamption: 'input[id="rejectReason-incompleteEvidenceOfMiamExamption"]',
    confidentalDetailListed: 'input[id="rejectReason-confidentalDetailListed"]',
    clarificationNeeded: 'input[id="rejectReason-clarificationNeeded"]',
    otherReason: 'input[id="rejectReason-otherReason"]',
    returnMessage: 'input[id="returnMessage"]'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Return application ');
  },

  async returnApplication() {
    await I.retry(retryCount).waitForPage('h1', 'Return application');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.consentOrderNotProvided);
    await I.retry(retryCount).click(this.fields.miamCertificateNotProvided);
    await I.retry(retryCount).click(this.fields.incompleteEvidenceOfMiamExamption);
    await I.retry(retryCount).click(this.fields.confidentalDetailListed);
    await I.retry(retryCount).click(this.fields.clarificationNeeded);
    await I.retry(retryCount).click(this.fields.otherReason);
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).wait('2');

    await I.retry(retryCount).see('Return message');
    await I.retry(retryCount).seeElement('<textarea class="form-control bottom-30 ng-touched ng-pristine ng-valid" rows="retryCount" id="returnMessage"></textarea>');
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).wait('2');


    await I.retry(retryCount).waitForText('Save and continue', '30');
    await I.retry(retryCount).click('Save and continue');
  },

  async runEventHappyPathReturnApplication() {
    await this.triggerEvent();
    await this.returnApplication();

    await I.retry(retryCount).submitEvent();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
