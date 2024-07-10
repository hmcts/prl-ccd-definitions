
const I = actor();
const retryCount = 3;
const longWait = 30;
const medWait = 10;


module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    returnToTaskTab: 'div > div.govuk-form-group.govuk-form-group--error > a',
    assignToMe: '//a[@id="action_claim"]',
    issueTaskName: '//a[contains(.,"Issue and send to local Court")]',
    courtListDropdown: '//select[@id="courtList"]',
    summaryTab: '//div[contains(text(),"Summary")]'
  },

  async issueCase() {
    await I.retry(retryCount).triggerEvent('Issue and send to local court');
    await I.waitForElement(this.fields.returnToTaskTab);
    await I.retry(retryCount).click(this.fields.returnToTaskTab);

    await I.wait(medWait);
    await I.reloadPage(this.fields.assignToMe);
    await I.waitForElement(this.fields.assignToMe);
    await I.retry(retryCount).click(this.fields.assignToMe);

    await I.waitForElement(this.fields.issueTaskName, medWait);
    await I.reloadPage(this.fields.issueTaskName);
    await I.waitForElement(this.fields.issueTaskName);
    await I.retry(retryCount).click(this.fields.issueTaskName);

    await I.waitForElement(this.fields.courtListDropdown, longWait);
    await I.selectOption(this.fields.courtListDropdown, 'Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('3');
    await I.retry(retryCount).click(this.fields.submit);
    // await I.wait(longWait);
    await I.waitForElement(this.fields.summaryTab);
    await I.retry(retryCount).click(this.fields.summaryTab);
    await I.waitForText('Case Issued');
  }
};
