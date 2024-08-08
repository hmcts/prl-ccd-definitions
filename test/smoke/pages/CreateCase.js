const I = actor();
const retryCount = 3;
const normalizeCaseId = caseId => {
  return caseId.toString().replace(/\D/g, '');
};

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    event: 'select[id="cc-event"]',
    createCaseLink: '//a[contains(.,"Create case")]',
    submit: 'button[type="submit"]'
  },

  async clickCreateCase() {
    I.wait('7');
    await I.waitForText('Create case');
    I.wait('7');
    await I.retry(retryCount).click(this.fields.createCaseLink);
  },

  async fillFormAndSubmit() {
    const maxRetries = 3; // Maximum number of retries to avoid infinite loop
    let retryCount = 0;
    let isOptionFound = false;

    while (retryCount < maxRetries && !isOptionFound) {
      try {
        await I.wait(5);
        await I.waitForElement(this.fields.jurisdiction);

        // Check if the option 'Family Private Law' is available
        const options = await I.grabTextFrom(this.fields.jurisdiction);
        if (options.includes('Family Private Law')) {
          isOptionFound = true;
          await I.selectOption(this.fields.jurisdiction, 'Family Private Law');
          await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
          await I.retry(retryCount).selectOption(this.fields.event, 'Solicitor application');
          await I.seeElement(this.fields.submit);
          await I.retry(retryCount).click(this.fields.submit);
          console.log('Family Private Law Solicitor application selected');
        } else {
          console.log('Family Private Law not found, refreshing the page...');
          await I.refreshPage();
          retryCount++;
        }
      } catch (error) {
        console.error(`Error selecting options, attempt ${retryCount + 1}:`, error);
        await I.refreshPage();
        retryCount++;
      }
    }

    if (!isOptionFound) {
      throw new Error('Family Private Law option was not found after multiple attempts.');
    }
  },

  async selectTypeOfApplicationC100() {
    await I.waitForText('Type of application');
    await I.seeElement('#caseTypeOfApplication-C100');
    await I.retry(retryCount).click('#caseTypeOfApplication-C100');
    await I.retry(retryCount).click(this.fields.submit);
    console.log('Type of application submitted');
  },

  async fillSolicitorApplicationPageC100() {
    await I.waitForText('Confidentiality Statement');
    await I.seeElement('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(retryCount).click('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(retryCount).click(this.fields.submit);
    console.log('Confidentiality statement submitted');


    await I.waitForElement('#applicantCaseName');
    await I.retry(retryCount).fillField('//input[@id="applicantCaseName"]', 'Smoke Test Case');
    await I.retry(retryCount).click(this.fields.submit);
    console.log('Application case name added');
  },

  async createNewCaseC100andReturnID() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h2:nth-child(3)'));
    return caseId;
  }
};