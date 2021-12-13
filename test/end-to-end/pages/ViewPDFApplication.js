const I = actor();

module.exports = {

    fields: {
        submit: 'button[type="submit"]',
        },

    async triggerEvent() {
        await I.triggerEvent('View PDF application');
    },

    async downloadApplication() {
        await I.waitForText('Download Application', '30');
        await I.click(this.fields.submit);
    },

    async runViewPDFApplicationEvent() {
        await this.triggerEvent();
        await this.downloadApplication();
        await I.submitEvent();
        await I.amOnHistoryPageWithSuccessNotification();
    }
};