const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    applicantRelationship: 'buffChildAndApplicantRelations_0_childAndApplicantRelation'  
},

  async triggerEvent() {
    await I.triggerEvent('Children and applicants');
  },
  async childAndApplicantRelationship() {
    await I.waitForText('Children and applicants');
    I.wait('2');
    await I.selectFromList(this.fields.applicantRelationship, 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndApplicantRelations_0_childLivesWith_No"]');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runChildrenAndApplicantRelationship() {
    await this.triggerEvent();
    await this.childAndApplicantRelationship();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};