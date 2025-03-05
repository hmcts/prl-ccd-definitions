const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Litigation capacity',
    textareaText: 'Testing text area',
    litigationCapacityFactors: 'textarea[id="litigationCapacityFactors"]',
    litigationCapacityReferrals: 'textarea[id="litigationCapacityReferrals"]',
    litigationCapacityOtherFactors: 'input[id="litigationCapacityOtherFactors_Yes"]',
    litigationCapacityOtherFactorsDetails: 'textarea[id="litigationCapacityOtherFactorsDetails"]'
  },
  async  litigationCapacity() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).fillField(this.fields.litigationCapacityFactors, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.litigationCapacityReferrals, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.litigationCapacityOtherFactors);
    await I.retry(retryCount).fillField(this.fields.litigationCapacityOtherFactorsDetails, this.fields.textareaText);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Save and continue', '10');
    await I.retry(retryCount).click('Save and continue');
  }

};
