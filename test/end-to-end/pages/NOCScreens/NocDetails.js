'use strict';
const I = actor();

const nocConfig = require('./nocConfig');

const retry = 3;

module.exports = {
  fields: {
    caseRef: '#caseRef',
    respFirstName: '#NoCChallengeQ1',
    respSecondName: '#NoCChallengeQ2',
    affirmation: '#affirmation',
    notifyParty: '#notifyEveryParty',
    respondentTab: '//div[contains(text(), \'Respondent 1 tasks\')]',
    submitEvent: '//p/a[contains(text(), \'Submit\')]',
    caseDocTab: '//div[contains(text(), \'Case documents\')]',
    confEle: '#resSolConfidentialityDisclaimerSubmit_confidentialityChecksChecked-confidentialityChecksChecked',
    decEle: '#respondentAgreeStatement-agree',
    respondentMiam: '//a[contains(.,"MIAM")]',
    respondentAOH: '//a[contains(.,"Make allegations of harm")]',
    respondentRAOH: '//a[contains(.,"Respond to allegations of harm")]',
    hasRespondentHaveAllegations: '*Are there allegations of harm?',
    raohText: 'Would you like to respond to the allegations of harm and violence raised by the other party?',
    raoh_No: '#responseToAllegationsOfHarmYesOrNoResponse_No',
    respondentAOH_No: '#respAohYesOrNo_No',
    cyaText: 'Check your answers'

  },

  async addNocDetails(caseId) {
    await I.waitForText(nocConfig.nocText);
    await I.retry(retry).click(nocConfig.nocText);
    await I.waitForText(nocConfig.nocRequirementText);
    await I.fillField(this.fields.caseRef, caseId);
    await I.click(nocConfig.continueText);

    await I.waitForText('Your client\'s first name');
    await I.fillField(this.fields.respFirstName, nocConfig.respFirstName);
    await I.fillField(this.fields.respSecondName, nocConfig.respLastName);
    await I.click(nocConfig.continueText);
  },

  async addNocDetailsForUser(caseId, firstname, lastname) {
    await I.waitForText(nocConfig.nocText);
    await I.retry(retry).click(nocConfig.nocText);
    await I.waitForText(nocConfig.nocRequirementText);
    await I.fillField(this.fields.caseRef, caseId);
    await I.click(nocConfig.continueText);

    await I.waitForText('Your client\'s first name');
    await I.fillField(this.fields.respFirstName, firstname);
    await I.fillField(this.fields.respSecondName, lastname);
    await I.click(nocConfig.continueText);

    await I.waitForText('Check and submit');
    await I.click('#affirmation');
    await I.click('#notifyEveryParty');

    await I.click('Submit');
  },

  async submitNocDetails(caseId) {
    await I.see(caseId);
    await I.see(nocConfig.respFirstName);
    await I.see(nocConfig.respLastName);
    await I.see(nocConfig.nocText);

    await I.click(this.fields.affirmation);
    await I.click(this.fields.notifyParty);
    await I.click(nocConfig.submitText);

    await I.waitForText(nocConfig.nocSuccessfulMsg);
    await I.click(nocConfig.viewCaseText);
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async fillRespondentAOHNoOption() {
    await I.wait('10');
    await I.waitForText(this.fields.hasRespondentHaveAllegations);
    await I.click(this.fields.respondentAOH_No);
    await I.click('Continue');
    await I.waitForText(this.fields.cyaText);
    await I.click('Save and continue');
  },

  async fillRespondentRAOHNoOption() {
    await I.wait('10');
    await I.waitForText(this.fields.raohText);
    await I.click(this.fields.raoh_No);
    await I.click('Continue');
    await I.waitForText(this.fields.cyaText);
    await I.click('Save and continue');
    await I.wait('5');
  },

  async fillRespondentTasks() {
    await I.triggerEvent(nocConfig.tsEvent);
    await I.click(nocConfig.submitText);
    await I.amOnHistoryPageWithSuccessNotification();

    await I.click(this.fields.respondentTab);
    await I.click(this.fields.respondentMiam);
    await I.fillRespondentMiamNoOption();
    await I.amOnHistoryPageWithSuccessNotification();
    await I.click(this.fields.respondentTab);
    await I.click(this.fields.respondentAOH);
    await this.fillRespondentAOHNoOption();
    await I.click(this.fields.respondentTab);
    await I.click(this.fields.respondentRAOH);
    await this.fillRespondentRAOHNoOption();
    await I.click(this.fields.respondentTab);
    await I.click(this.fields.submitEvent);

    await I.waitForText(nocConfig.expConfidentialityText);
    await I.click(this.fields.confEle);
    await I.click(nocConfig.continueText);

    await I.waitForText(nocConfig.expDeclarationText);
    await I.click(this.fields.decEle);
    await I.click(nocConfig.continueText);

    await I.click(nocConfig.saveAndContinue);
    await I.waitForText('Response Submitted');
    await I.click(nocConfig.returnToCaseDetails);
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async verifyC7DocumentGeneration() {
    await I.click(this.fields.caseDocTab);
    await I.see(nocConfig.c7Doc);
    await I.see(`${nocConfig.respFirstName} ${nocConfig.respLastName}`);
    await I.see(nocConfig.respSolName);
  },

  async triggerAndVerifyNocChanges(caseId) {
    await this.addNocDetails(caseId);
    await this.submitNocDetails(caseId);
    await this.fillRespondentTasks();
    await this.verifyC7DocumentGeneration();
  },

  async submitAndVerifyNOCForApplicantCase(caseId, firstname, lastname) {
    await this.addNocDetailsForUser(caseId, firstname, lastname);
  }

};