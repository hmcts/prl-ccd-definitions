const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    flTruthConsent: '#fl401StmtOfTruth_applicantConsent-fl401Consent',
    dobDay: '#date-day',
    dobMonth: '#date-month',
    dobYear: '#date-year',
    fname: '#fl401StmtOfTruth_fullname',
    firmName: '#fl401StmtOfTruth_nameOfFirm',
    signName: '#fl401StmtOfTruth_signOnBehalf',
    confidentialConsent: '#fl401ConfidentialityCheck_confidentialityConsent',
    selectCourt: 'select[id="submitCountyCourtSelection"]'
  },


  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Statement of Truth and submit');
  },

  async fillTruthDetails() {
    await I.wait('7');
    await I.waitForElement(this.fields.flTruthConsent);
    await I.click(this.fields.flTruthConsent);
    await I.fillField(this.fields.dobDay, '21');
    await I.fillField(this.fields.dobMonth, '12');
    await I.fillField(this.fields.dobYear, '2023');
    await I.fillField(this.fields.fname, 'Test name');
    await I.fillField(this.fields.firmName, 'Test firm name');
    await I.fillField(this.fields.signName, 'Test sign');
    await I.runAccessibilityTest();
    await I.continueEvent();
  },

  async selectConfidentialConsent() {
    await I.waitForElement(this.fields.confidentialConsent);
    await I.click(this.fields.confidentialConsent);
    await I.continueEvent();
    await I.selectOption(this.fields.selectCourt, 'Aberystwyth Justice Centre - Trefechan - SY23 1AS');
    await I.click('Submit');
  },

  async runStatementOfTruthEvent() {
    await this.triggerEvent();
    await this.fillTruthDetails();
    await this.selectConfidentialConsent();
    await I.amOnHistoryPageWithSuccessNotification();
    await I.see('Submitted');
    await I.see('Aberystwyth Justice Centre');
    await I.see('Non-molestation order Occupation order');
  }
};