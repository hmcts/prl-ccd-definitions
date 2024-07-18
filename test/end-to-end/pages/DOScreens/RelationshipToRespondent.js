const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Relationship to respondent');
  },

  async relationshipToRespondent() {
    await I.triggerEvent('Relationship to respondent');
    await I.waitForText('Select the applicant\'s relationship to the respondent:');
    await I.click('#respondentRelationObject_applicantRelationship-engagedOrProposed');
    await I.continueEvent();

    await I.waitForText('When did their relationship start and when did it end? If unknown, please give an approximate date (Optional)');
    await I.runAccessibilityTest();
    await I.fillField('//*[@id="relationshipDateComplexStartDate-day"]', '10');
    await I.fillField('//*[@id="relationshipDateComplexStartDate-month"]', '10');
    await I.fillField('//*[@id="relationshipDateComplexStartDate-year"]', '2010');
    I.wait('1');
    await I.fillField('//*[@id="relationshipDateComplexEndDate-day"]', '10');
    await I.fillField('//*[@id="relationshipDateComplexEndDate-month"]', '10');
    await I.fillField('//*[@id="relationshipDateComplexEndDate-year"]', '2020');
    I.wait('1');
    await I.fillField('//*[@id="applicantRelationshipDate-day"]', '1');
    await I.fillField('//*[@id="applicantRelationshipDate-month"]', '1');
    await I.fillField('//*[@id="applicantRelationshipDate-year"]', '2015');
    await I.continueEvent();
  },

  async relationshipToRespondentOther() {
    await I.waitForText('Select the applicant\'s relationship to the respondent:');
    await I.click('#respondentRelationObject_applicantRelationship-noneOfTheAbove');
    await I.continueEvent();

    await I.waitForText('What is the respondent’s relationship with the applicant?');
    await I.runAccessibilityTest();
    await I.click('#respondentRelationOptions_applicantRelationshipOptions-other');
    await I.fillField('#respondentRelationOptions_relationOptionsOther', 'Other text area');
    await I.continueEvent();
  },

  async runEventrelationshipToRespondent() {
    // await this.triggerEvent();
    await this.relationshipToRespondent();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();

    await this.triggerEvent();
    await this.relationshipToRespondentOther();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
