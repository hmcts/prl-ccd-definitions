'use strict';
const I = actor();

const nocConfig = require('./nocConfig');

module.exports = {
  fields: {
    caseRef: '#caseRef',
    respFirstName: '#NoCChallengeQ1',
    respSecondName: '#NoCChallengeQ2',
    affirmation: '#affirmation',
    notifyParty: '#notifyEveryParty',
    respondentTab: '//div[contains(text(), \'Respondent tasks A\')]',
    submitEvent: '//p/a[contains(text(), \'Submit\')]',
    caseDocTab: '//div[contains(text(), \'Case documents\')]',
    confEle: '#resSolConfidentialityDisclaimerSubmit_confidentialityChecksChecked-confidentialityChecksChecked',
    decEle: '#respondentAgreeStatement-agree'
  },

  async addNocDetails(caseId) {
    await I.click(nocConfig.nocText);
    await I.waitForText(nocConfig.nocRequirementText);
    await I.fillField(this.fields.caseRef, caseId);
    await I.click(nocConfig.continueText);

    await I.waitForText('Your client\'s first name');
    await I.fillField(this.fields.respFirstName, nocConfig.respFirstName);
    await I.fillField(this.fields.respSecondName, nocConfig.respLastName);
    await I.click(nocConfig.continueText);
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

  async fillRespondentTasks() {
    await I.triggerEvent(nocConfig.tsEvent);
    await I.click(nocConfig.submitText);
    await I.amOnHistoryPageWithSuccessNotification();

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
  }


};