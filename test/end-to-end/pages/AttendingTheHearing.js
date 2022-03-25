const I = actor();

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
     await I.retry(3).triggerEvent('Attending the hearing');
  },

  async attendingTheHearing() {
     await I.retry(3).waitForPage('h1', 'Attending the hearing');

     await I.retry(3).click(this.fields.isWelshNeeded);
     await I.retry(3).see('Welsh needs');
     await I.retry(3).click('#welshNeeds > div > button');
    I.wait('1');
     await I.retry(3).fillField(this.fields.whoNeedsWelsh, 'Joe Doe');
     await I.retry(3).click(this.fields.welshSpoken);
     await I.retry(3).click(this.fields.welshWritten);
     await I.retry(3).click(this.fields.welshSpokenAndWritten);

     await I.retry(3).click(this.fields.isInterpreterNeeded);
     await I.retry(3).see('Interpreter needs');
     await I.retry(3).click('#interpreterNeeds > div > button');
     await I.retry(3).click(this.fields.interpreterNeedsApplicant);
     await I.retry(3).click(this.fields.interpreterNeedsRespondent);
     await I.retry(3).click(this.fields.interpreterNeedsOther);
     await I.retry(3).fillField(this.fields.interpreterNeedsName, 'Person One');
     await I.retry(3).fillField(this.fields.interpreterNeedsLanguage, 'Polish');
     await I.retry(3).fillField(this.fields.otherAssistance, 'None');

     await I.retry(3).wait('1');
     await I.retry(3).click(this.fields.isDisabilityPresent);
     await I.retry(3).wait('1');
     await I.retry(3).see('Describe the adjustments that the court needs to make.');
     await I.retry(3).fillField(this.fields.adjustmentsRequired, 'Example text - adjustment');

     await I.retry(3).click(this.fields.isSpecialArrangementsRequired);
     await I.retry(3).wait('1');
     await I.retry(3).see('Give details of the special arrangements that are required.');
     await I.retry(3).fillField(this.fields.specialArrangementsRequired, 'Example text - arrangements');

     await I.retry(3).click(this.fields.isIntermediaryNeeded);
     await I.retry(3).wait('1');
     await I.retry(3).see('Set out the reasons that an intermediary is required.');
     await I.retry(3).fillField(this.fields.reasonsForIntermediary, 'Example text - intermediary');

     await I.retry(3).wait('2');
     await I.retry(3).click('Continue');

     await I.retry(3).waitForText('Save and continue', '30');
     await I.retry(3).click('Save and continue');
  },

  async runEventHappyPathAttendingTheHearing() {
    await this.triggerEvent();
    await this.attendingTheHearing();

     await I.retry(3).submitEvent();
     await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};
