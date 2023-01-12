const I = actor();
const retryCount = 3;

module.exports = {
    async triggerEvent() {
        await I.triggerEvent('Send to gate keeper');
      },

      async AddNewGateKeeper()  {
        await this.triggerEvent();
        await I.retry(retryCount).waitForText('Gatekeeper');
        await I.retry(retryCount).click('Add new');
        await I.wait('2');
        await I.retry(retryCount).waitForText('Email address');
        await I.retry(retryCount).fillField('//input[@id="gatekeeper_0_email"]', 'gatekeeper123@gmail.com');
        await I.retry(retryCount).click('Continue')  ;
        await I.wait('2');
        await I.retry(retryCount).click('Save and continue');
        await I.wait('2');
    }
};