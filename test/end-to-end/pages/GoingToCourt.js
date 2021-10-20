const I = actor();

module.exports = {
  fields: {
    isWelshNeeded: '#IsWelshNeeded_Yes',
    isInterpreterNeeded: '#IsInterpreterNeeded_Yes',
    isDisabilityPresent: '#IsDisabilityPresent_Yes',
    isSpecialArrangementsRequired: '#IsSpecialArrangementsRequired_Yes',
    isIntermediaryNeeded: '#IsIntermediaryNeeded_Yes',
    whoNeedsWelsh: '#WelshNeeds_0_WhoNeedsWelsh',
    welshSpoken: '#WelshNeeds_0_SpokenOrWritten-Spoken',
    welshWritten: '#WelshNeeds_0_SpokenOrWritten-Written',
    welshSpokenAndWritten: '#WelshNeeds_0_SpokenOrWritten-Both',
    interpreterNeedsApplicant: '#InterpreterNeeds_0_Party-Applicant',
    interpreterNeedsRespondent: '#InterpreterNeeds_0_Party-Respondent',
    interpreterNeedsOther: '#InterpreterNeeds_0_Party-Other',
    interpreterNeedsName: '#InterpreterNeeds_0_Name',
    interpreterNeedsLanguage: '#InterpreterNeeds_0_Language',
    adjustmentsRequired: 'textarea[id="AdjustmentsRequired"]',
    specialArrangementsRequired: 'textarea[id="SpecialArrangementsRequired"]',
    reasonsForIntermediary: '#ReasonsForIntermediary',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Going to court');
  },

  async goingToCourt() {
    await I.waitForPage('h1', 'Going to court');

    await I.click(this.fields.isWelshNeeded);
    await I.see('Welsh needs');
    await I.click('#WelshNeeds > div > button');
    I.wait('1');
    await I.fillField(this.fields.whoNeedsWelsh, 'Joe Doe');
    await I.click(this.fields.welshSpoken);
    await I.click(this.fields.welshWritten);
    await I.click(this.fields.welshSpokenAndWritten);

    await I.click(this.fields.isInterpreterNeeded);
    await I.see('Interpreter needs');
    await I.click('#InterpreterNeeds > div > button');
    await I.click(this.fields.interpreterNeedsApplicant);
    await I.click(this.fields.interpreterNeedsRespondent);
    await I.click(this.fields.interpreterNeedsOther);
    await I.fillField(this.fields.interpreterNeedsName, 'Person One');
    await I.fillField(this.fields.interpreterNeedsLanguage, 'Polish');

    I.wait('1');
    await I.click(this.fields.isDisabilityPresent);
    I.wait('1');
    await I.see('Describe the adjustments that the court needs to make.');
    await I.fillField(this.fields.adjustmentsRequired, 'Example text - adjustment');

    await I.click(this.fields.isSpecialArrangementsRequired);
    I.wait('1');
    await I.see('Give details of the special arrangements that are required.');
    await I.fillField(this.fields.specialArrangementsRequired, 'Example text - arrangements');

    await I.click(this.fields.isIntermediaryNeeded);
    I.wait('1');
    await I.see('Set out the reasons that an intermediary is required.');
    await I.fillField(this.fields.reasonsForIntermediary, 'Example text - intermediary');

    I.wait('2');
    await I.click('Continue');

    I.waitForText('Submit', '30');
    await I.click('Submit');
  },

  async runEventHappyPathGoingToCourt() {
    await this.triggerEvent();
    await this.goingToCourt();

    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
