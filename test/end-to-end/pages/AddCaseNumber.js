const I = actor();
const retryCount = 3;

module.exports = {

    async triggerEvent() {
      await I.triggerEvent('Add case number');

    },

    async AddingCaseNumber() {
        await this.triggerEvent();
        await I.wait('5');
        await I.retry(retryCount).waitForText('Family Man ID:');
        await I.wait('2');
        await I.retry(retryCount).fillField('//input[@id="familymanCaseNumber"]', '122354545454');
        await I.retry(retryCount).click('Continue');
        await I.wait('2');
        await I.retry(retryCount).click('Save and continue');
        await I.wait('2');
    }
};