const I = actor();

module.exports = {
  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Attending the hearing');
  },

  async attendingTheHearing() {
    await I.waitForPage('h1', 'Attending the hearing');
    await I.click('#isWelshNeeded_Yes');
    await I.see('Welsh wants');
    await I.click('//*[@id="fl401WelshNeeds"]/div/button[1]');
    I.wait('1');
    await I.fillField('#fl401WelshNeeds_0_whoNeedsWelsh', 'Joe Doe');
    await I.click('#fl401WelshNeeds_0_fl401SpokenOrWritten-spoken');
    await I.click('#fl401WelshNeeds_0_fl401SpokenOrWritten-written');

    await I.click('#isInterpreterNeeded_Yes');
    await I.see('Interpreter needs');
    await I.click('//*[@id="interpreterNeeds"]/div/button');
    await I.click('#interpreterNeeds_0_party-applicant');
    await I.click('#interpreterNeeds_0_party-respondent');
    await I.click('#interpreterNeeds_0_party-other');
    await I.fillField('#interpreterNeeds_0_name', 'Person One');
    await I.fillField('#interpreterNeeds_0_language', 'Polish');
    await I.fillField('#interpreterNeeds_0_otherAssistance', 'None');

    await I.wait('1');
    await I.click('#isDisabilityPresent_Yes');
    await I.wait('1');
    await I.see('Describe the adjustments that the court needs to make.');
    await I.fillField('#adjustmentsRequired', 'Example text - adjustment');

    await I.click('#isSpecialArrangementsRequired_Yes');
    await I.wait('1');
    await I.see('Give details of the special arrangements that are required.');
    await I.fillField('#specialArrangementsRequired', 'Example text - arrangements');

    await I.click('#isIntermediaryNeeded_Yes');
    await I.wait('1');
    await I.see('Set out the reasons that an intermediary is required.');
    await I.fillField('#reasonsForIntermediary', 'Example text - intermediary');
    await I.wait('2');
    await I.continueEvent();
  },

  async runEventHappyPathAttendingTheHearingDO() {
    await this.triggerEvent();
    await this.attendingTheHearing();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
