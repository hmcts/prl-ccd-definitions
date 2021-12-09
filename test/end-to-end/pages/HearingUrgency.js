const I = actor();

module.exports = {
  fields: {
    headerText: 'Hearing urgency',
    textareaText: 'Testing text area',
    appUrgentInput: 'input[id="isCaseUrgent_Yes"]',
    caseUrgencyTimeAndReason: 'textarea[id="caseUrgencyTimeAndReason"]',
    effortsMadeWithRespondents: 'textarea[id="effortsMadeWithRespondents"]',
    applicationNoticeEfforts: 'textarea[id="applicationNoticeEfforts"]',
    appWithoutNotice: 'input[id="doYouNeedAWithoutNoticeHearing_Yes"]',
    appWithoutNoticeReasons: 'textarea[id="reasonsForApplicationWithoutNotice"]',
    hearingWithReducedNotice: 'input[id="doYouRequireAHearingWithReducedNotice_Yes"]',
    hearingWithReducedNoticeReason: 'textarea[id="setOutReasonsBelow"]',
    respondentsAwareOfProceedings: 'input[id="areRespondentsAwareOfProceedings_Yes"]'
  },

  async  hearingUrgency() {
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.click(this.fields.appUrgentInput);
    await I.waitForEnabled(this.fields.caseUrgencyTimeAndReason);
    await I.fillField(this.fields.caseUrgencyTimeAndReason, this.fields.textareaText);
    await I.fillField(this.fields.effortsMadeWithRespondents, this.fields.textareaText);
    await I.click(this.fields.appWithoutNotice);
    await I.waitForEnabled(this.fields.appWithoutNoticeReasons);
    await I.fillField(this.fields.appWithoutNoticeReasons, this.fields.textareaText);
    await I.click(this.fields.hearingWithReducedNotice);
    await I.waitForEnabled(this.fields.hearingWithReducedNoticeReason);
    await I.fillField(this.fields.hearingWithReducedNoticeReason, this.fields.textareaText);
    await I.click(this.fields.respondentsAwareOfProceedings);
    await I.click('Continue');
    await I.waitForText('Submit', '30');
    await I.click('Submit');
  }

};