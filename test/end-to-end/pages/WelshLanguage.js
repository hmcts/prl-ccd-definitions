const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Welsh language requirements',
    welshLanguageRequirement_Y: '#welshLanguageRequirement_Yes',
    welshLanguageRequirementApplication: '#welshLanguageRequirementApplication-english',
    languageRequirementApplicationNeedWelsh: '#languageRequirementApplicationNeedWelsh_Yes'
  },
  async  welshLanguageRequirement() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).click(this.fields.welshLanguageRequirement_Y);
    await I.retry(retryCount).click(this.fields.welshLanguageRequirementApplication);
    await I.retry(retryCount).wait('2');
    await I.retry(retryCount).see('Does this application need to be translated into Welsh? (Optional)');
    await I.retry(retryCount).click(this.fields.languageRequirementApplicationNeedWelsh);
    await I.retry(retryCount).continueEvent();
    await I.runAccessibilityTest();
    await I.wait('1');
    await I.retry(retryCount).waitForText('Save and continue', '30');
    await I.retry(retryCount).click('Save and continue');
  }

};
