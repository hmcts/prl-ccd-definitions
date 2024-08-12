const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    hasRespondentAttendedQone: 'Has the respondent attended a Mediation Information and Assessment Meeting (MIAM)?',
    hasRespondentHaveAllegations: '*Are there allegations of harm?',
    hasRespondentAttendedMiam_No: '#hasRespondentAttendedMiam_No',
    willingToAttendMiam: 'Would they be willing to attend a MIAM?',
    respondentWillingToAttendMiam_No: '#respondentWillingToAttendMiam_No',
    respondentReasonNotAttendingMiam: '#respondentReasonNotAttendingMiam',
    respondentAOH_No: '#respAohYesOrNo_No',
    respondentReasonNotAttendingMiamText: 'TEST REASON',
    cyaText: 'Check your answers'
  },
  async fillIsRespondentAttendedMiam_NoOption() {
    await I.wait('6');
    await I.waitForText(this.fields.hasRespondentAttendedQone);
    await I.retry(retryCount)
      .click(this.fields.hasRespondentAttendedMiam_No);
    await I.retry(retryCount)
      .I.continueEvent();
  },
  async fillWillingToAttendedMiam_NoOption() {
    await I.wait('2');
    await I.waitForText(this.fields.willingToAttendMiam);
    await I.retry(retryCount).click(this.fields.respondentWillingToAttendMiam_No);
    await I.wait('2');
    await I.fillField(this.fields.respondentReasonNotAttendingMiam, this.fields.respondentReasonNotAttendingMiamText);
    await I.retry(retryCount)
      .I.continueEvent();
    await I.waitForText(this.fields.cyaText);
    await I.waitForText(this.fields.respondentReasonNotAttendingMiamText);
    await I.retry(retryCount).click('Save and continue');
  },
  async fillRespondentMiamNoOption() {
    await this.fillIsRespondentAttendedMiam_NoOption();
    await this.fillWillingToAttendedMiam_NoOption();
  },
  async fillRespondentAOHNoOption() {
    await I.wait('10');
    await I.waitForText(this.fields.hasRespondentHaveAllegations);
    await I.click(this.fields.respondentAOH_No);
    await I.continueEvent();
    await I.waitForText(this.fields.cyaText);
    await I.click('Save and continue');
  }

};