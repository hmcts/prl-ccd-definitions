const I = actor();

module.exports = {
  fields: {
    isWelshNeeded: 'input[id="IsWelshNeeded_Yes"]',
    isInterpreterNeeded: 'input[id="IsInterpreterNeeded_Yes"]',
    isDisabilityPresent: 'input[id="IsDisabilityPresent_Yes"]',
    isSpecialArrangementsRequired: 'input[id="IsSpecialArrangementsRequired"]',
    isIntermediaryNeeded: 'input[id="IsIntermediaryNeeded"]',
    whoNeedsWelsh: 'input[id="WelshNeeds_0_WhoNeedsWelsh"]',
    welshSpoken: 'input[id="WelshNeeds_0_SpokenOrWritten-Spoken"]',
    welshWritten: 'input[id="WelshNeeds_0_SpokenOrWritten-Written"]',
    welshSpokenAndWritten: 'input[id="WelshNeeds_0_SpokenOrWritten-Both"]',
    interpreterNeedsApplicant: 'input[id="InterpreterNeeds_0_Party-Applicant"]',
    interpreterNeedsRespondent: 'input[id="InterpreterNeeds_0_Party-Respondent"]',
    interpreterNeedsOther: 'input[id="InterpreterNeeds_0_Party-Other"]',
    interpreterNeedsName: 'input[id="InterpreterNeeds_0_Name"]',
    interpreterNeedsLanguage: 'input[id="InterpreterNeeds_0_Language"]',
    adjustmentsRequired: 'textarea[id="AdjustmentsRequired"]',
    specialArrangementsRequired: 'textarea[id="SpecialArrangementsRequired"]',
    reasonsForIntermediary: 'textarea[id="ReasonsForIntermediary"]',
    submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Going to court');
  },

  async goingToCourt() {
    await I.waitForPage('h1', 'Going to court');

    I.click(this.fields.isWelshNeeded);
    I.see('Welsh needs');
    this.fillField(this.fields.whoNeedsWelsh, 'Joe Doe');
    I.click(this.fields.welshSpoken);
    I.click(this.fields.welshWritten);
    I.click(this.fields.welshSpokenAndWritten);

    I.click(this.fields.isInterpreterNeeded);
    I.see('Interpreter needs');
    I.click(this.fields.interpreterNeedsApplicant);
    I.click(this.fields.interpreterNeedsRespondent);
    I.click(this.fields.interpreterNeedsOther);
    this.fillField(this.fields.interpreterNeedsName, 'Person One');
    this.fillField(this.fields.interpreterNeedsLanguage, 'Polish');

    I.click(this.fields.isDisabilityPresent);
    I.see('Describe the adjustments that the court needs to make.');
    this.fillField(this.fields.adjustmentsRequired, 'Example text - adjustment');

    I.click(this.fields.isSpecialArrangementsRequired);
    I.wait('1');
    I.see('Give details of the special arrangements that are required.');
    this.fillField(this.fields.specialArrangementsRequired, 'Example text - arrangements');

    I.click(this.fields.isIntermediaryNeeded);
    I.wait('1');
    I.see('Set out the reasons that an intermediary is required.');
    this.fillField(this.fields.reasonsForIntermediary, 'Example text - intermediary');

    I.wait('5');
    I.click('Continue');

    I.waitForText('Submit', '30');
    I.click('Submit');
  },

  async runEventHappyPath() {
    await this.triggerEvent();
    await this.goingToCourt();

    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
