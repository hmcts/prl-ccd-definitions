const I = actor();

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
    await I.retry(3).triggerEvent(this.fields.headerText);
    await I.retry(3).waitForPage('h1', this.fields.headerText);
    await I.retry(3).click(this.fields.habitualResidentInOtherState);
    await I.retry(3).fillField(this.fields.habitualResidentInOtherStateGiveReason, this.fields.textareaText);
    await I.retry(3).click(this.fields.jurisdictionIssue);
    await I.retry(3).fillField(this.fields.jurisdictionIssueGiveReason, this.fields.textareaText);
    await I.retry(3).click(this.fields.requestToForeignAuthority);
    await I.retry(3).fillField(this.fields.requestToForeignAuthorityGiveReason, this.fields.textareaText);
    await I.retry(3).wait('2');
    await I.retry(3).click('Continue');
    await I.retry(3).waitForText('Save and continue', '30');
    await I.retry(3).click('Save and continue');
  }

};
