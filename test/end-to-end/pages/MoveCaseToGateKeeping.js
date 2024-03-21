// eslint-disable-next-line no-magic-numbers
const I = actor();
const retryCount = 3;
const longWait = 30;
const medWait = 10;
const shortWait = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    returnToTaskTab: 'div > div.govuk-form-group.govuk-form-group--error > a',
    assignTaskToMe: '//exui-case-task/p/strong[contains(text(), "Send to Gatekeeper")]/../../dl/div[4]//dd/a[3]',
    gateKeeperTask: '//a[contains(.,"Send To Gatekeeper")]',
    selectGateKeeperOption: '#isSpecificGateKeeperNeeded_No'
  },

  async moveCaseToGateKeeping() {
    await I.retry(retryCount).triggerEvent('Send to gatekeeper');
    await I.wait(longWait);
    await I.retry(retryCount).click(this.fields.returnToTaskTab);

    await I.wait(medWait);
    await I.reloadPage(this.fields.assignTaskToMe);
    await I.waitForElement(this.fields.assignTaskToMe);
    await I.retry(retryCount).click(this.fields.assignTaskToMe);

    await I.waitForElement(this.fields.gateKeeperTask, medWait);
    await I.reloadPage(this.fields.gateKeeperTask);
    await I.waitForElement(this.fields.gateKeeperTask);
    await I.retry(retryCount).click(this.fields.gateKeeperTask);

    await I.wait(longWait);
    await I.retry(retryCount).click(this.fields.selectGateKeeperOption);
    await I.retry(retryCount).click(this.fields.submit);

    await I.wait(shortWait);
    await I.retry(retryCount).click(this.fields.submit);

    await I.wait(medWait);
    await I.seeElement('//span[contains(.,"success")]');
    await I.see('Gatekeeping');
  }
};