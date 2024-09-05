
const I = actor();
const retryCount = 3;
const medWait = 20;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    caseStatus: '.text-16',
    helpWithFees_Yes: '#helpWithFees_Yes',
    helpWithFees_No: '#helpWithFees_No',
    helpWithFeesReferenceNumber_text: '#helpWithFeesReferenceNumber',
    HWFQuestion: 'Has the applicant applied for Help with Fees?',
    prlNoHWFText:
      'Help with Fees is not yet available in the Family Private Law digital service.',
    HWFYesErrorMsg:
      'Help with Fees is not yet available in Family Private Law digital ' +
      'service. Select \'No\' to continue with your application',
    HWFRefNum: 'ABC-123-DEF',
    fl401StmtOfTruth_applicantConsent: '#fl401StmtOfTruth_applicantConsent-fl401Consent',
    fl401StmtOfTruth_dateDay: '#date-day',
    fl401StmtOfTruth_dateMonth: '#date-month',
    fl401StmtOfTruth_dateYear: '#date-year',
    fl401StmtOfTruth_fullname: '#fl401StmtOfTruth_fullname',
    fl401StmtOfTruth_nameOfFirm: '#fl401StmtOfTruth_nameOfFirm',
    fl401StmtOfTruth_signOnBehalf: '#fl401StmtOfTruth_signOnBehalf',
    fl401ConfidentialCheck: '#fl401ConfidentialityCheck_confidentialityConsent-fl401ConfidentialConsent',
    fl401countyCourtSelection: '#submitCountyCourtSelection'
  },

  async triggerEvent() {
    global.logCallingFunction();
    await I.triggerEvent('Submit and pay');
    await I.retry(retryCount).waitForText('Confidentiality Statement', medWait);
  },

  async triggerDummyPaymentEvent() {
    global.logCallingFunction();
    await I.retry(retryCount).triggerEvent('Dummy Payment confirmation');
    await I.waitForText('Dummy Payment confirmation');
    await I.waitForText('Make the payment');
  },

  async confidentialityStatement() {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText('Confidentiality Statement', medWait);
    await I.retry(retryCount).click(
      '#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked'
    );
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },
  async confidentialityStatementFL401() {
    global.logCallingFunction();
    await I.wait('10');
    await I.retry(retryCount).waitForText('Ensure that no confidential information has been disclosed in the application');
    await I.wait('1');
    await I.retry(retryCount).click('#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked');
    await I.retry(retryCount).continueEvent();
  },

  async declaration() {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText('Declaration');
    await I.retry(retryCount).click('#payAgreeStatement-agree');
    await I.retry(retryCount).waitForText(this.fields.prlNoHWFText);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },

  async helpWithFeeNo() {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText(this.fields.HWFQuestion);
    await I.retry(retryCount).click(this.fields.helpWithFees_No);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('6');
    await I.retry(retryCount).waitForText('Continue to payment');
    await I.retry(retryCount).click('Close and Return to case details');
    await I.wait('2');
  },
  async helpWithFeeYes() {
    global.logCallingFunction();
    await I.wait('2');
    await I.retry(retryCount).waitForText(this.fields.HWFQuestion);
    await I.retry(retryCount).click(this.fields.helpWithFees_Yes);
    await I.wait('1');
    await I.retry(retryCount).fillField(
      this.fields.helpWithFeesReferenceNumber_text,
      this.fields.HWFRefNum
    );
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
    await I.retry(retryCount).waitForText(this.fields.HWFYesErrorMsg);
  },

  async payNow() {
    global.logCallingFunction();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async happensNext() {
    global.logCallingFunction();
    await I.waitForClickable(this.fields.submit);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async happensNextCourtAdmin() {
    await I.wait('12');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('6');
    await I.retry(retryCount).waitForElement(this.fields.caseStatus);
    await I.wait('4');
    await I.retry(retryCount).waitForText('Submitted');
  },

  async runDummyPayment() {
    global.logCallingFunction();
    await this.triggerDummyPaymentEvent();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async caseSubmittedCA() {
    global.logCallingFunction();
    await I.waitForText('Submitted');
  },

  async answerHelpWithFeesNo() {
    global.logCallingFunction();
    await I.wait('4');
    await I.retry(retryCount).click(this.fields.helpWithFees_No);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async submitAndPay() {
    global.logCallingFunction();
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeNo();
    await this.runDummyPayment();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await this.caseSubmittedCA();
  },
  async FL401StatementOfTruth() {
    global.logCallingFunction();
    await I.retry(retryCount).click(this.fields.fl401StmtOfTruth_applicantConsent);
    await I.retry(retryCount).fillField(this.fields.fl401StmtOfTruth_dateDay, '11');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.fl401StmtOfTruth_dateMonth, '7');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.fl401StmtOfTruth_dateYear, '2023');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.fl401StmtOfTruth_fullname, 'Solicitor Full Name');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.fl401StmtOfTruth_nameOfFirm, 'Solicitor Firm');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.fl401StmtOfTruth_signOnBehalf, 'Solicitor');
    await I.wait('2');
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async FL401ConfidentialityCheck() {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText('Ensure that no confidential information has been disclosed in the application');
    await I.retry(retryCount).click(this.fields.fl401ConfidentialCheck);
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async statementOfTruthAndSubmit() {
    global.logCallingFunction();
    await I.retry(retryCount).triggerEvent('Statement of Truth and submit');
    await I.wait('6');
    await this.FL401StatementOfTruth();
    await this.FL401ConfidentialityCheck();
    await this.selectFamilyCourt('Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  },
  async selectFamilyCourt(courtName) {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText('Select the family court');
    await I.retry(retryCount).selectOption(this.fields.fl401countyCourtSelection, courtName);
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('4');
  },
  async submitAndPay_HWF_Yes() {
    global.logCallingFunction();
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeYes();
  },

  async submitAndPayForDummySolicitorApplication() {
    global.logCallingFunction();
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.answerHelpWithFeesNo();
    await this.happensNext();
    await this.happensNext();
    await this.runDummyPayment();
    await this.caseSubmittedCA();
  },

  async submitAndPayCourtAdmin() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.payNow();
    await this.happensNextCourtAdmin();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
