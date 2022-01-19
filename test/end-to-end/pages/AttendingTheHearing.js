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
    await I.triggerEvent('Attending the hearing');
  },

  async attendingTheHearing() {
    await I.waitForPage('h1', 'Attending the hearing');

    await I.click(this.fields.isWelshNeeded);
    await I.see('Welsh needs');
    await I.click('#welshNeeds > div > button');
    I.wait('1');
    await I.fillField(this.fields.whoNeedsWelsh, 'Joe Doe');
    await I.click(this.fields.welshSpoken);
    await I.click(this.fields.welshWritten);
    await I.click(this.fields.welshSpokenAndWritten);

    await I.click(this.fields.isInterpreterNeeded);
    await I.see('Interpreter needs');
    await I.click('#interpreterNeeds > div > button');
    await I.click(this.fields.interpreterNeedsApplicant);
    await I.click(this.fields.interpreterNeedsRespondent);
    await I.click(this.fields.interpreterNeedsOther);
    await I.fillField(this.fields.interpreterNeedsName, 'Person One');
    await I.fillField(this.fields.interpreterNeedsLanguage, 'Polish');
    await I.fillField(this.fields.otherAssistance, 'None');

    await I.wait('1');
    await I.click(this.fields.isDisabilityPresent);
    await I.wait('1');
    await I.see('Describe the adjustments that the court needs to make.');
    await I.fillField(this.fields.adjustmentsRequired, 'Example text - adjustment');

    await I.click(this.fields.isSpecialArrangementsRequired);
    await I.wait('1');
    await I.see('Give details of the special arrangements that are required.');
    await I.fillField(this.fields.specialArrangementsRequired, 'Example text - arrangements');

    await I.click(this.fields.isIntermediaryNeeded);
    await I.wait('1');
    await I.see('Set out the reasons that an intermediary is required.');
    await I.fillField(this.fields.reasonsForIntermediary, 'Example text - intermediary');

    await I.wait('2');
    await I.click('Continue');

    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  },

  async runEventHappyPathAttendingTheHearing() {
    await this.triggerEvent();
    await this.attendingTheHearing();

    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
