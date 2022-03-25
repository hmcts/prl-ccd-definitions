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
    await I.retry(3).triggerEvent(this.fields.headerText);
    await I.retry(3).waitForPage('h1', this.fields.headerText);
    await I.retry(3).click(this.fields.appUrgentInput);
    await I.retry(3).waitForEnabled(this.fields.caseUrgencyTimeAndReason);
    await I.retry(3).fillField(this.fields.caseUrgencyTimeAndReason, this.fields.textareaText);
    await I.retry(3).fillField(this.fields.effortsMadeWithRespondents, this.fields.textareaText);
    await I.retry(3).click(this.fields.appWithoutNotice);
    await I.retry(3).waitForEnabled(this.fields.appWithoutNoticeReasons);
    await I.retry(3).fillField(this.fields.appWithoutNoticeReasons, this.fields.textareaText);
    await I.retry(3).click(this.fields.hearingWithReducedNotice);
    await I.retry(3).waitForEnabled(this.fields.hearingWithReducedNoticeReason);
    await I.retry(3).fillField(this.fields.hearingWithReducedNoticeReason, this.fields.textareaText);
    await I.retry(3).click(this.fields.respondentsAwareOfProceedings);
    await I.retry(3).click('Continue');
    await I.retry(3).waitForText('Save and continue', '30');
    await I.retry(3).click('Save and continue');
  }

};