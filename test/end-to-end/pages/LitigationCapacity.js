const I = actor();

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
    await I.retry(3).triggerEvent(this.fields.headerText);
    await I.retry(3).waitForPage('h1', this.fields.headerText);
    await I.retry(3).fillField(this.fields.litigationCapacityFactors, this.fields.textareaText);
    await I.retry(3).fillField(this.fields.litigationCapacityReferrals, this.fields.textareaText);
    await I.retry(3).click(this.fields.litigationCapacityOtherFactors);
    await I.retry(3).wait('2');
    await I.retry(3).fillField(this.fields.litigationCapacityOtherFactorsDetails, this.fields.textareaText);
    await I.retry(3).click('Continue');
    await I.retry(3).waitForText('Save and continue', '30');
    await I.retry(3).click('Save and continue');
  }

};
