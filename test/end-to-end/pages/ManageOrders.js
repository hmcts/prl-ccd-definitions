const I = actor();
const retryCount = 3;

module.exports = {

    fields: {
        submit: 'button[type="submit"]'
      },
    
    async triggerEvent() {
      await I.triggerEvent('Manage orders');
    },

    async ManageOrdersUpload() {
    await I.retry(retryCount).waitForElement('#manageOrdersOptions-createAnOrder');
    await I.retry(retryCount).checkOption('#manageOrdersOptions-createAnOrder');
    await I.retry(retryCount).click('Continue'); 
    },

    async uploadBlankOrder () {
    await I.retry(retryCount).waitForElement('#createSelectOrderOptions-blankOrderOrDirections');
    await I.retry(retryCount).checkOption('#createSelectOrderOptions-blankOrderOrDirections');
    await I.retry(retryCount).click('Continue');
},

async BlankOrderC21 () {
await I.retry(retryCount).waitForElement('#isOrderDrawnForCafcass_Yes');
await I.retry(retryCount).checkOption('#isOrderDrawnForCafcass_Yes');
await I.retry(retryCount).checkOption('#cafcassReports-safeguardingLetters1');
await I.retry(retryCount).selectOption('#selectTypeOfOrder', 'General');
await I.retry(retryCount).checkOption('#isTheOrderByConsent_Yes');
await I.retry(retryCount).checkOption('#wasTheOrderApprovedAtHearing_Yes');
await I.retry(retryCount).checkOption('#judgeOrMagistrateTitle-circuitJudge');
await I.retry(retryCount).fillField('#judgeOrMagistratesLastName', 'Peter');
await I.retry(retryCount).fillField('#justiceLegalAdviserFullName', 'Williams');
await I.retry(retryCount).fillField('#dateOrderMade-day', '11');
await I.retry(retryCount).fillField('#dateOrderMade-month', '9');
await I.retry(retryCount).fillField('#dateOrderMade-year', '2022');
await I.retry(retryCount).checkOption('#isTheOrderAboutAllChildren-yes');
await I.retry(retryCount).fillField('#recitalsOrPreamble', 'xyz');
await I.retry(retryCount).fillField('#orderDirections', 'abc');
await I.retry(retryCount).fillField('#furtherDirectionsIfRequired', 'test');
await I.retry(retryCount).click('Continue');
await I.wait('2');
},

async CheckYourOrder () {
    await I.retry(retryCount).waitForText('Check your order');
    await I.retry(retryCount).click('Continue');
},
async OrderRecipients () {
    await I.retry(retryCount).checkOption('#orderRecipients-applicantOrApplicantSolicitor');
    await I.retry(retryCount).checkOption('#orderRecipients-respondentOrRespondentSolicitor');
    await I.retry(retryCount).checkOption('#otherOrderRecipients-xyz');
    await I.retry(retryCount).checkOption('#otherOrderRecipients-abc');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
},

async runEventHappyPath() {
    await this.triggerEvent();
    await this.ManageOrdersUpload();
    await this.uploadBlankOrder();
    await this.BlankOrderC21();
    await this.CheckYourOrder();
    await this.OrderRecipients ();
  }
};     



