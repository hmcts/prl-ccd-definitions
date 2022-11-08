const I = actor();
const retryCount = 3;

module.exports = {

    fields: {
        submit: 'button[type="submit"]'
      },
      async triggerEvent() {
        await I.triggerEvent('Service of Application');
      },  
    async  ServiceConfirmRecipients () {
        I.wait('5');
        await I.retry(retryCount).click('Continue');
        // await I.retry(retryCount).checkOption('#confirmRecipients_applicantsList-applicantOrApplicantSolicitor');
        // await I.retry(retryCount).checkOption('#confirmRecipients_applicantsList-respondentOrRespondentSolicitor');
        // await I.retry(retryCount).checkOption('#confirmRecipients_otherPeopleList-xyz');
        // await I.retry(retryCount).checkOption('#confirmRecipients_otherPeopleList-abc');
        await I.retry(retryCount).click('Continue');
        I.wait('2');
        await I.retry(retryCount).click(this.fields.submit);
    },
    async runServiceApplication() {
        await this.triggerEvent();
        await this.ServiceConfirmRecipients();
        await I.retry(retryCount).submitEvent();
}
};