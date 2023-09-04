const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area', 

    //Applicant and Child 1/2
    app1AndChild1: 'select[id="buffChildAndApplicantRelations_0_childAndApplicantRelation"]',
    app1AndChild2: 'select[id="buffChildAndApplicantRelations_1_childAndApplicantRelation"]',

    //Child 1/2 and respondent
    resp1AndChild1: 'select[id="buffChildAndRespondentRelations_0_childAndRespondentRelation"]',
    resp1AndChild2: 'select[id="buffChildAndRespondentRelations_1_childAndRespondentRelation"]',

    //Child 1/2 and Other people
    op1AndChild1: 'select[id="buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelation"]',
    op1AndChild2: 'select[id="buffChildAndOtherPeopleRelations_1_childAndOtherPeopleRelation"]',
  },

  async childrenAndApplicant() {
    await I.retry(retryCount).triggerEvent('Children and applicants');
    await I.retry(retryCount).waitForText('Children and applicants');
    I.wait('1');
    await I.waitForElement(this.fields.app1AndChild1);
    await I.retry(retryCount).selectOption(this.fields.app1AndChild1, 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndApplicantRelations_0_childLivesWith_Yes');
    I.wait('1');
    await I.waitForElement(this.fields.app1AndChild2);
    await I.retry(retryCount).selectOption(this.fields.app1AndChild2, 'Father');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndApplicantRelations_1_childLivesWith_Yes');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async childrenAndRespondent() {
    await I.retry(retryCount).triggerEvent('Children and respondents');
    await I.retry(retryCount).waitForText('Children and respondents');
    I.wait('1');
    await I.waitForElement(this.fields.resp1AndChild1);
    await I.retry(retryCount).selectOption(this.fields.resp1AndChild1, 'Mother');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndRespondentRelations_0_childLivesWith_Yes');
    I.wait('1');
    await I.waitForElement(this.fields.resp1AndChild2);
    await I.retry(retryCount).selectOption(this.fields.resp1AndChild2, 'Mother');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndRespondentRelations_1_childLivesWith_Yes');
    await I.retry(retryCount).click(this.fields.submit);
  },
  async childrenAndOtherPeople() {
    await I.retry(retryCount).triggerEvent('Children and other people');
    await I.retry(retryCount).waitForText('Children and other people');
    I.wait('1');
    await I.waitForElement(this.fields.op1AndChild1);
    await I.retry(retryCount).selectOption(this.fields.op1AndChild1, 'Grandparent');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndOtherPeopleRelations_0_childLivesWith_Yes');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_Yes');
    I.wait('2');
    await I.waitForElement(this.fields.op1AndChild2);
    await I.retry(retryCount).selectOption(this.fields.op1AndChild2, 'Grandparent');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndOtherPeopleRelations_1_childLivesWith_Yes');
    I.wait('1');
    await I.retry(retryCount).checkOption('#buffChildAndOtherPeopleRelations_1_isChildLivesWithPersonConfidential_Yes');
    await I.retry(retryCount).click(this.fields.submit);
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
