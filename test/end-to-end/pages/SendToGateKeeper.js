const I = actor();
const retryCount = 3;

module.exports = {

    fields: { submit: 'button[type="submit"]' },

    async triggerEvent() {
        await I.triggerEvent('Send to gate keeper');
    },

    async sendToGateKeeper() {
        I.wait('2');
        await I.retry(retryCount).click('Add new');
        I.wait('3');
        await I.retry(retryCount).fillField('#gatekeeper_0_email', 'westlondonfamilyenquiries@justice.gov.uk');
        await I.retry(retryCount).click('Continue');
        I.wait('2');
    },

    async sendToGateKeepersHappyPath() {
        await this.triggerEvent();
        await this.sendToGateKeeper();
        await I.submitEvent();
        await I.amOnHistoryPageWithSuccessNotification();
    }
};
