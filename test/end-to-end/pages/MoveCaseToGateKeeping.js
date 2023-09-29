const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',

  },
  async moveCaseToGateKeeping() {
    await I.retry(retryCount).triggerEvent('Send to gate keeper');
    I.wait('3');
    await I.retry(retryCount).click("//a[contains(.,'Return to tasks tab to assign a task')]");
    I.wait('3');
    await I.retry(retryCount).click("//p[contains(.,'Send to Gatekeeper')]//..//div[4]//a[@id='action_claim']");
    I.wait('3');
    await I.retry(retryCount).click("//a[contains(.,'Send To Gatekeeper')]");
    I.wait('10');
    await I.retry(retryCount).click("#isSpecificGateKeeperNeeded_No");
    await I.retry(retryCount).click(this.fields.submit);
    I.wait('3');
    await I.retry(retryCount).click(this.fields.submit);
    I.wait('3');
    await I.seeElement("//span[contains(.,'success')]");
  }
};