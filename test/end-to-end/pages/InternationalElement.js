const I = actor();

module.exports = {
    fields: {
        headerText: 'International element',
        textareaText: 'Testing text area',
        habitualResidentInOtherState: 'input[id="HabitualResidentInOtherState_Yes"]',
        habitualResidentInOtherStateGiveReason: 'textarea[id="HabitualResidentInOtherStateGiveReason"]',
        jurisdictionIssue: 'input[id="JurisdictionIssue_Yes"]',
        jurisdictionIssueGiveReason: 'textarea[id="JurisdictionIssueGiveReason"]',
        requestToForeignAuthority: 'input[id="RequestToForeignAuthority_Yes"]',
        requestToForeignAuthorityGiveReason: 'textarea[id="RequestToForeignAuthorityGiveReason"]'
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
        await I.waitForText('Submit', '30');
        await I.click('Submit');
    }

};
