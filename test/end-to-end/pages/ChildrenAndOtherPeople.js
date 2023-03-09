const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    otherPerson1Relationship: 'select[id="buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelation"]',
    otherPerson2Relationship: 'select[id="buffChildAndOtherPeopleRelations_1_childAndOtherPeopleRelation"]',

},

  async triggerEvent() {
    await I.triggerEvent('Children and other people');
  },
  async childAndOtherPeopleRelationship() {
    await I.waitForText('Children and other people');
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.otherPerson1Relationship, 'Grandparent');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndOtherPeopleRelations_0_childLivesWith_Yes"]');
    I.wait('2)')
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_Yes"]');
    I.wait('1');
    await I.retry(retryCount).selectOption(this.fields.otherPerson2Relationship, 'Grandparent');
    I.wait('1');
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndOtherPeopleRelations_1_childLivesWith_Yes"]');
    I.wait('2)')
    await I.retry(retryCount).checkOption('//input[@id="buffChildAndOtherPeopleRelations_1_isChildLivesWithPersonConfidential_Yes"]');
    I.wait('1');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runChildrenAndOtherPeopleRelationship() {
    await this.triggerEvent();
    await this.childAndOtherPeopleRelationship();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};