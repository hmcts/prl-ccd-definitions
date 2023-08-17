const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area'
  },

  async childrenAndApplicant() {
    await I.retry(retryCount).triggerEvent('Children and applicants');
    await I.retry(retryCount).waitForText('Children and applicants');
    I.wait('1');
    await I.retry(retryCount).selectOption('//input[@id="buffChildAndApplicantRelations_0_childAndApplicantRelation"]', 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndApplicantRelations_0_childLivesWith_Yes');
    I.wait('1');
    await I.retry(retryCount).selectOption('//input[@id="buffChildAndApplicantRelations_1_childAndApplicantRelation"]', 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndApplicantRelations_1_childLivesWith_Yes');
  },
  async childrenAndRespondent() {
    await I.retry(retryCount).triggerEvent('Children and respondents');
    await I.retry(retryCount).waitForText('Children and respondents');
    I.wait('1');
    await I.retry(retryCount).selectOption('//input[@id="buffChildAndRespondentRelations_0_childAndRespondentRelation"]', 'Mother');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndRespondentRelations_0_childLivesWith_Yes');
    I.wait('1');
    await I.retry(retryCount).selectOption('//input[@id="buffChildAndRespondentRelations_1_childAndRespondentRelation"]', 'Mother');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndRespondentRelations_1_childLivesWith_Yes');
  },
  async childrenAndOtherPeople() {
    await I.retry(retryCount).triggerEvent('Children and other people');
    await I.retry(retryCount).waitForText('Children and other people');
    I.wait('1');
    await I.retry(retryCount).selectOption('//input[@id="buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelation"]', 'Grandparent');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndOtherPeopleRelations_0_childLivesWith_Yes');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_Yes');
  },
  async runChildrenAndApplicant() {
    await this.childrenAndApplicant();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  },
  async runChildrenAndRespondent() {
    await this.childrenAndRespondent();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  },
  async runChildrenAndOtherPeople() {
    await this.childrenAndOtherPeople();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};