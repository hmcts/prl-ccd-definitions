const I = actor();

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
    await I.retry(3).triggerEvent('Return application ');
  },

  async returnApplication() {
    await I.retry(3).waitForPage('h1', 'Return application');

    await I.retry(3).click(this.fields.consentOrderNotProvided);
    await I.retry(3).click(this.fields.miamCertificateNotProvided);
    await I.retry(3).click(this.fields.incompleteEvidenceOfMiamExamption);
    await I.retry(3).click(this.fields.confidentalDetailListed);
    await I.retry(3).click(this.fields.clarificationNeeded);
    await I.retry(3).click(this.fields.otherReason);
    await I.retry(3).click('Continue');
    await I.retry(3).wait('2');

    await I.retry(3).see('Return message');
    await I.retry(3).seeElement('<textarea class="form-control bottom-30 ng-touched ng-pristine ng-valid" rows="3" id="returnMessage"></textarea>');

    await I.retry(3).click('Continue');
    await I.retry(3).wait('2');


    await I.retry(3).waitForText('Save and continue', '30');
    await I.retry(3).click('Save and continue');
  },

  async runEventHappyPathReturnApplication() {
    await this.triggerEvent();
    await this.returnApplication();

    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};
