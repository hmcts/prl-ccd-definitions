const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'International element',
    textareaText: 'Testing text area',
    habitualResidentInOtherState: 'input[id="habitualResidentInOtherState_Yes"]',
    habitualResidentInOtherStateGiveReason: 'textarea[id="habitualResidentInOtherStateGiveReason"]',
    jurisdictionIssue: 'input[id="jurisdictionIssue_Yes"]',
    jurisdictionIssueGiveReason: 'textarea[id="jurisdictionIssueGiveReason"]',
    requestToForeignAuthority: 'input[id="requestToForeignAuthority_Yes"]',
    requestToForeignAuthorityGiveReason: 'textarea[id="requestToForeignAuthorityGiveReason"]'
  },
  async internationalElement() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).click(this.fields.habitualResidentInOtherState);
    await I.retry(retryCount).fillField(this.fields.habitualResidentInOtherStateGiveReason, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.jurisdictionIssue);
    await I.retry(retryCount).fillField(this.fields.jurisdictionIssueGiveReason, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.requestToForeignAuthority);
    await I.retry(retryCount).fillField(this.fields.requestToForeignAuthorityGiveReason, this.fields.textareaText);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Save and continue', '10');
    await I.retry(retryCount).click('Save and continue');
  }

};
