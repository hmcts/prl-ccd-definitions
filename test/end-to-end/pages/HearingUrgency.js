const I = actor();
const retryCount = 3;

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

  async hearingUrgency() {
    // await I.wait('15');
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.waitForText('*Is this case urgent?');
    await I.retry(retryCount).click(this.fields.appUrgentInput);
    await I.retry(retryCount).waitForEnabled(this.fields.caseUrgencyTimeAndReason);
    await I.retry(retryCount).fillField(this.fields.caseUrgencyTimeAndReason, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.effortsMadeWithRespondents, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.appWithoutNotice);
    await I.retry(retryCount).waitForEnabled(this.fields.appWithoutNoticeReasons);
    await I.retry(retryCount).fillField(this.fields.appWithoutNoticeReasons, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.hearingWithReducedNotice);
    await I.retry(retryCount).waitForEnabled(this.fields.hearingWithReducedNoticeReason);
    await I.retry(retryCount).fillField(this.fields.hearingWithReducedNoticeReason, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.respondentsAwareOfProceedings);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Save and continue', 'retryCount0');
    await I.retry(retryCount).click('Save and continue');
  }

};