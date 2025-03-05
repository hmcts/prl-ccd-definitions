const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    const respondentBehaviourEventOption = '//select[@id = "next-step"]//option[contains(text(),"Respondent\'s behaviour")]';
    await I.waitForElement(respondentBehaviourEventOption);
    // eslint-disable-next-line quotes
    await I.triggerEvent("Respondent's behaviour");
  },

  async respondentBehaviour() {
    await I.waitForText('What does the applicant want to stop the respondent from doing? (Optional)');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_1');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_2');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_3');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_4');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_5');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_6');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_7');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_8');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_9');

    await I.waitForText('What does the applicant want to stop the respondent from doing to their child or children (if applicable)? (Optional)');
    await I.runAccessibilityTest();
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_1');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_2');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_3');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_4');
    await I.click('#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_5');

    await I.fillField('#respondentBehaviourData_otherReasonApplicantWantToStopFromRespondentDoing', 'Text Area');
    I.wait('2');
    await I.continueEvent();
  },

  async runEventRespondentBehaviour() {
    await this.triggerEvent();
    await this.respondentBehaviour();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
