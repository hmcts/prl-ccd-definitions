const I = actor();

module.exports = {

  fields: {
    eventSelectField: 'select[id="next-step"]',
    eventName: 'Type of application',
    submit: 'button[type="submit"]',
    nonMolestationOrder: '#typeOfApplicationOrders_orderType-nonMolestationOrder',
    occupationOrder: '#typeOfApplicationOrders_orderType-occupationOrder',
    ordersApplyingForPageHeader: 'Which order(s) are you applying for?',
    ordersApplyingForPageMandatoryText: 'Which order(s) are you applying for? is required',
    linkToChildArrangementsApplicationHeader: 'Is this linked to Child Arrangements application? (Optional)',
    linkedChildArrangementsApplicationYes: '#typeOfApplicationLinkToCA_linkToCaApplication_Yes',
    childArrangementOrderInstructionText: 'If you have also completed a Child Arrangements Order application enter the case number below.',
    childArrangementCaseNumberLabel: 'Child Arrangements Case Number (FamilyMan cases not supported) (Optional)',
    childArrangementsCaseNumberField: '#typeOfApplicationLinkToCA_caApplicationNumber',
    //Case Number Regex validation error message to be introduced
    childArrangementsCaseNumberText: '1234123412341234',
    checkYourAnswersPageHeader: 'Check your answers'
  },

  async actionTypeOfApplicationEventFL401() {
    await I.waitForText(this.fields.eventName);
    await I.selectOption(this.fields.eventSelectField, this.fields.eventName);
    await I.waitForEnabled(this.fields.submit);
    await I.click(this.fields.submit);
  },

  async ordersApplyingForPage() {
    await I.waitForText(this.fields.ordersApplyingForPageHeader);
    //Checking mandatory field validation
    await I.click(this.fields.submit);
    await I.waitForText(this.fields.ordersApplyingForPageMandatoryText);
    await I.click(this.fields.nonMolestationOrder);
    await I.click(this.fields.occupationOrder);
    await I.click('Continue');
  },

  async linkToChildArrangementsApplication() {
    await I.waitForText(this.fields.linkToChildArrangementsApplicationHeader);
    await I.click(this.fields.linkedChildArrangementsApplicationYes);
    //await I.wait('5');
    await I.waitForText(this.fields.childArrangementOrderInstructionText);
    await I.waitForText(this.fields.childArrangementCaseNumberLabel);
    await I.fillField(this.fields.childArrangementsCaseNumberField, this.fields.childArrangementsCaseNumberText);   
    await I.click('Continue');
  },

  async checkYourAnswersPage() {
    await I.waitForText(this.fields.checkYourAnswersPageHeader);
    await I.waitForText(this.fields.childArrangementsCaseNumberText);
    await I.click('Save and continue');
  },

  async typeOfApplicationEventFL401() {
    await this.actionTypeOfApplicationEventFL401();
    await this.ordersApplyingForPage();
    await this.linkToChildArrangementsApplication();
    await this.checkYourAnswersPage();
  }
};
