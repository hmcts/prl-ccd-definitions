const I = actor();

module.exports = {
  fields: {
    headerText: 'Welsh language requirements',
    welshLanguageRequirement_Y: '#welshLanguageRequirement_Yes',
    welshLanguageRequirementApplication: '#welshLanguageRequirementApplication-english',
    languageRequirementApplicationNeedWelsh: '#languageRequirementApplicationNeedWelsh_Yes'
  },
  async  welshLanguageRequirement() {
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.click(this.fields.welshLanguageRequirement_Y);
    await I.wait('2');
    await I.click(this.fields.welshLanguageRequirementApplication);
    await I.wait('2');
    await I.see('Does this application need to be translated into Welsh? (Optional)');
    await I.click(this.fields.languageRequirementApplicationNeedWelsh);
    await I.click('Continue');
    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  }

};
