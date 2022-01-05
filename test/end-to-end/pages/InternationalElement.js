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
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.click(this.fields.habitualResidentInOtherState);
    await I.fillField(this.fields.habitualResidentInOtherStateGiveReason, this.fields.textareaText);
    await I.click(this.fields.jurisdictionIssue);
    await I.fillField(this.fields.jurisdictionIssueGiveReason, this.fields.textareaText);
    await I.click(this.fields.requestToForeignAuthority);
    await I.fillField(this.fields.requestToForeignAuthorityGiveReason, this.fields.textareaText);
    await I.wait('2');
    await I.click('Continue');
    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  }

};
