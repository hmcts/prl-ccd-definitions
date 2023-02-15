const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    respondentRelationship: 'buffChildAndRespondentRelations_0_childAndRespondentRelation'  
},

  async triggerEvent() {
    await I.triggerEvent('Children and respondents');
  },
  async childAndRespondentRelationship() {
    await I.waitForText('Children and respondents');
    I.wait('2');
    await I.selectFromList(this.fields.respondentRelationship, 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndRespondentRelations_0_childLivesWith_Yes"]');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runChildrenAndRespondentRelationship() {
    await this.triggerEvent();
    await this.childAndRespondentRelationship();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};