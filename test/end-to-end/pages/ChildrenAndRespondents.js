const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    respondent1Relationship: 'select[id="buffChildAndRespondentRelations_0_childAndRespondentRelation"]',
    respondent2Relationship: 'select[id="buffChildAndRespondentRelations_1_childAndRespondentRelation"]'
},

  async triggerEvent() {
    await I.triggerEvent('Children and respondents');
  },
  async childAndRespondentRelationship() {
    await I.waitForText('Children and respondents');
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.respondent1Relationship, 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndRespondentRelations_0_childLivesWith_Yes"]');
    I.wait('2)')
    await I.retry(retryCount).selectOption(this.fields.respondent2Relationship, 'Step-mother');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndRespondentRelations_1_childLivesWith_Yes"]');
    I.wait('1');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runChildrenAndRespondentRelationship() {
    await this.triggerEvent();
    await this.childAndRespondentRelationship();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};