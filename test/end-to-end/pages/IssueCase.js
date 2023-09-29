const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',

  },
  async issueCase() {
    await I.retry(retryCount).triggerEvent('Issue and send to local court');
    I.wait('3');
    await I.retry(retryCount).click("//a[contains(.,'Return to tasks tab to assign a task')]");
    I.wait('3');
    await I.retry(retryCount).click("//a[@id='action_claim']");
    I.wait('3');
    await I.retry(retryCount).click("//a[contains(.,'Issue and send to local Court')]");
    I.wait('10');
    I.selectOption("//select[@id='courtList']","Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP");
    await I.retry(retryCount).click(this.fields.submit);
    I.wait('3');
    await I.retry(retryCount).click(this.fields.submit);
    I.wait('15');
    await I.see('Case Issued');
  }
};
