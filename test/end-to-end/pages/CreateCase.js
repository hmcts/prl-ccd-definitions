const I = actor();

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    event: 'select[id="cc-event"]',
    submit: 'button[type="submit"]'
  },

  async clickCreateCase() {
    I.wait('1');
    await I.waitForText('Create case');
    I.wait('5');
    await I.click('Accept analytics cookies');
    I.wait('5');
    await I.click('Create case');
  },

  async fillFormAndSubmit() {
    await I.waitForElement(this.fields.jurisdiction);
    await I.selectOption(this.fields.jurisdiction, 'Family Private Law');
    await I.selectOption(this.fields.caseType, 'C100 Application');
    await I.selectOption(this.fields.event, 'Solicitor application');
    await I.waitForClickable(this.fields.submit);
    await I.click(this.fields.submit);
  },

  async fillSolicitorApplicationPage() {
    await I.waitForElement('#ApplicantName');
    await I.fillField('//input[@id="ApplicantName"]', 'Test Parent');
    await I.fillField('//input[@id="ChildName"]', 'Test Child');
    await I.click('Continue');
  },

  async createNewCase() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.fillSolicitorApplicationPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
