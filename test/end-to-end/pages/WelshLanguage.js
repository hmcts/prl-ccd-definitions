const I = actor();

module.exports = {
  fields: {
    headerText: 'Welsh language requirements',
    welshLanguageRequirement_Y: '#welshLanguageRequirement_Yes',
    welshLanguageRequirementApplication: '#welshLanguageRequirementApplication-english',
    languageRequirementApplicationNeedWelsh: '#languageRequirementApplicationNeedWelsh_Yes'
  },
  async  welshLanguageRequirement() {
    await I.retry(3).triggerEvent(this.fields.headerText);
    await I.retry(3).waitForPage('h1', this.fields.headerText);
    await I.retry(3).click(this.fields.welshLanguageRequirement_Y);
    await I.retry(3).wait('2');
    await I.retry(3).click(this.fields.welshLanguageRequirementApplication);
    await I.retry(3).wait('2');
    await I.retry(3).see('Does this application need to be translated into Welsh? (Optional)');
    await I.retry(3).click(this.fields.languageRequirementApplicationNeedWelsh);
    await I.retry(3).click('Continue');
    await I.retry(3).waitForText('Save and continue', '30');
    await I.retry(3).click('Save and continue');
  }

};
