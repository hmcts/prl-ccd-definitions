const I = actor();
const retryCount = 3;
const manageOrder = require('./ManageOrders');

module.exports = {

  fields: {
    draftOrdersDynamicList: '#draftOrdersDynamicList',
    draftOrdersDynamicListOption: '//select[@id="draftOrdersDynamicList"]/option[2]',
    AddHearingOutcome: '#fl404CustomFields_fl404bHearingOutcome'
  },

  async editAReturnedOrderByJudge() {
    await I.retry(retryCount).triggerEvent('Edit a returned order');
    await I.retry(retryCount).waitForText('Select the order');
    const option = await I.grabTextFrom(this.fields.draftOrdersDynamicListOption);
    await I.selectOption(this.fields.draftOrdersDynamicList, option);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Instructions from the judge');
    await I.retry(retryCount).waitForText('Reject solicitor draft order');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Edit a returned order');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Hearing outcome');
    await I.retry(retryCount).fillField(this.fields.AddHearingOutcome, 'TEST HEARING OUTCOME ADD');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.waitForText('You can create multiple hearings');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Preview the order');
    await I.retry(retryCount).click('Continue');
  }

};
