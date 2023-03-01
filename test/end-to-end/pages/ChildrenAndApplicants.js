const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    applicant1Relationship: 'select[id="buffChildAndApplicantRelations_0_childAndApplicantRelation"]', 
    applicant2Relationship: 'select[id="buffChildAndApplicantRelations_1_childAndApplicantRelation"]' 

},

  async triggerEvent() {
    await I.triggerEvent('Children and applicants');
  },
  async childAndApplicantRelationship() {
    await I.waitForText('Children and applicants');
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.applicant1Relationship, 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndApplicantRelations_0_childLivesWith_No"]');
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.applicant2Relationship, 'Step-mother');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndApplicantRelations_1_childLivesWith_No"]');
    I.wait('1');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runChildrenAndApplicantRelationship() {
    await this.triggerEvent();
    await this.childAndApplicantRelationship();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};