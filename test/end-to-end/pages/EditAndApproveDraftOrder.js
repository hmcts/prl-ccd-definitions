const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    orderByConsent_Yes: '#isTheOrderByConsent_Yes',
    draftOrdersDynamicList: '#draftOrdersDynamicList'
  },
  async selectOrderForJudgeReview() {
    await I.retry(retryCount).triggerEvent('Edit and approve a draft order');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Select the draft order for editing');
    await I.retry(retryCount).selectOption(this.fields.draftOrdersDynamicList, '1: Object');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
  }
};