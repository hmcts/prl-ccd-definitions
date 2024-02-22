const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    draftOrdersDynamicList: '#draftOrdersDynamicList',
    draftOrdersDynamicListOption: '//select[@id="draftOrdersDynamicList"]/option[2]'
  },

    async editAReturnedOrderByJudge() {
        await I.retry(retryCount).triggerEvent('Edit a returned order');
        await I.retry(retryCount).waitForText('Select the order');
        const option = await I.grabTextFrom(this.fields.draftOrdersDynamicListOption);
        await I.selectOption(this.fields.draftOrdersDynamicList,option);
        await I.retry(retryCount).click('Continue');
        await I.wait('2');
        await I.retry(retryCount).waitForText('Instructions from the judge');
        await I.retry(retryCount).waitForText('Reject solicitor draft order');
        await I.retry(retryCount).click('Continue');
        await I.wait('2');
}
};


