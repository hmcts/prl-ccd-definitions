const I = actor();
const retryCount = 3;
const manageOrder = require('./ManageOrders');
const powerOfArrestOrderScreen = require('./PowerofarrestFL406');

module.exports = {
  async solicitorDraftAnOrderPowerOfArrestFL406() {
    await I.retry(retryCount).triggerEvent('Draft an order');
    await I.wait('2');
    await this.draftAnOrderModeOfOrder('Draft an order');
    await this.selectTypeOfOrderForDraftAnOrder('Power of arrest (FL406)');
    await I.wait('2');
    await manageOrder.fillGenericScreen();
    await I.retry(retryCount).waitForText('Is the order about the children?');
    await I.retry(retryCount).click(manageOrder.fields.isTheOrderAboutChildrenDA_No);
    await I.retry(retryCount).fillField(manageOrder.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).click('Continue');
    await I.wait('7');
    await powerOfArrestOrderScreen.fillPowerOfArrestOrderScreen();
    await this.previewTheOrder();
    await manageOrder.checkYourAnswersAndSubmit();
  },
  async draftAnOrderModeOfOrder(modeOfOrder) {
    await I.runAccessibilityTest();
    await I.retry(retryCount).triggerEvent('Draft an order');
    await I.wait('2');
    await I.retry(retryCount).waitForText('What do you want to do?');
    await I.retry(retryCount).click(modeOfOrder);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
  },
  async selectTypeOfOrderForDraftAnOrder(orderName) {
    await I.runAccessibilityTest();
    await I.retry(retryCount).waitForText('Draft an order');
    await I.retry(retryCount).waitForText('Select order');
    await I.retry(retryCount).click(orderName);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },
  async previewTheOrder() {
    await I.retry(retryCount).waitForText('Preview the order');
    await I.retry(retryCount).waitForText('draft.pdf');
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  }

}