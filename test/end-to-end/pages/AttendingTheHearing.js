const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    isWelshNeeded: '#isWelshNeeded_Yes',
    isInterpreterNeeded: '#isInterpreterNeeded_Yes',
    isDisabilityPresent: '#isDisabilityPresent_Yes',
    isSpecialArrangementsRequired: '#isSpecialArrangementsRequired_Yes',
    isIntermediaryNeeded: '#isIntermediaryNeeded_Yes',
    whoNeedsWelsh: '#welshNeeds_0_whoNeedsWelsh',
    welshSpoken: '#welshNeeds_0_spokenOrWritten-spoken',
    welshWritten: '#welshNeeds_0_spokenOrWritten-written',
    welshSpokenAndWritten: '#welshNeeds_0_spokenOrWritten-both',
    interpreterNeedsApplicant: '#interpreterNeeds_0_party-applicant',
    interpreterNeedsRespondent: '#interpreterNeeds_0_party-respondent',
    interpreterNeedsOther: '#interpreterNeeds_0_party-other',
    interpreterNeedsName: '#interpreterNeeds_0_name',
    interpreterNeedsLanguage: '#interpreterNeeds_0_language',
    otherAssistance: '#interpreterNeeds_0_otherAssistance',
    adjustmentsRequired: 'textarea[id="adjustmentsRequired"]',
    specialArrangementsRequired: 'textarea[id="specialArrangementsRequired"]',
    reasonsForIntermediary: '#reasonsForIntermediary',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Attending the hearing');
  },

  async attendingTheHearing() {
    await I.retry(retryCount).waitForPage('h1', 'Attending the hearing');
    await I.retry(retryCount).click(this.fields.isWelshNeeded);
    await I.retry(retryCount).see('Welsh needs');
    await I.retry(retryCount).click('#welshNeeds > div > button');

    await I.retry(retryCount).fillField(this.fields.whoNeedsWelsh, 'Joe Doe');
    await I.retry(retryCount).click(this.fields.welshSpoken);
    await I.retry(retryCount).click(this.fields.welshWritten);
    await I.retry(retryCount).click(this.fields.welshSpokenAndWritten);

    await I.retry(retryCount).click(this.fields.isInterpreterNeeded);
    await I.retry(retryCount).see('Interpreter needs');
    await I.retry(retryCount).click('#interpreterNeeds > div > button');
    await I.retry(retryCount).click(this.fields.interpreterNeedsApplicant);
    await I.retry(retryCount).click(this.fields.interpreterNeedsRespondent);
    await I.retry(retryCount).click(this.fields.interpreterNeedsOther);
    await I.retry(retryCount).fillField(this.fields.interpreterNeedsName, 'Person One');
    await I.retry(retryCount).fillField(this.fields.interpreterNeedsLanguage, 'Polish');
    await I.retry(retryCount).fillField(this.fields.otherAssistance, 'None');

    await I.retry(retryCount).click(this.fields.isDisabilityPresent);
    await I.retry(retryCount).fillField(this.fields.adjustmentsRequired, 'Example text - adjustment');

    await I.retry(retryCount).click(this.fields.isSpecialArrangementsRequired);
    await I.retry(retryCount).fillField(this.fields.specialArrangementsRequired, 'Example text - arrangements');

    await I.retry(retryCount).click(this.fields.isIntermediaryNeeded);
    await I.retry(retryCount).see('Set out the reasons that an intermediary is required.');
    await I.retry(retryCount).fillField(this.fields.reasonsForIntermediary, 'Example text - intermediary');

    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();

    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).waitForText('Save and continue', '10');
    await I.retry(retryCount).click('Save and continue');
  },

  async runEventHappyPathAttendingTheHearing() {
    await this.triggerEvent();
    await this.attendingTheHearing();

    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
