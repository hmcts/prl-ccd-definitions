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
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.fillField(this.fields.litigationCapacityFactors, this.fields.textareaText);
    await I.fillField(this.fields.litigationCapacityReferrals, this.fields.textareaText);
    await I.click(this.fields.litigationCapacityOtherFactors);
    await I.wait('2');
    await I.fillField(this.fields.litigationCapacityOtherFactorsDetails, this.fields.textareaText);
    await I.click('Continue');
    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  }

};
