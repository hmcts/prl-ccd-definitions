const I = actor();

module.exports = {
  fields: {
   consentOrderNotProvided: 'input[id="rejectReason-consentOrderNotProvided"]',
   miamCertificateNotProvided: 'input[id="rejectReason-miamCertificateNotProvided"]',
   incompleteEvidenceOfMiamExamption: 'input[id="rejectReason-incompleteEvidenceOfMiamExamption"]',
   confidentalDetailListed: 'input[id="rejectReason-confidentalDetailListed"]',
   clarificationNeeded: 'input[id="rejectReason-clarificationNeeded"]',
   otherReason: 'input[id="rejectReason-otherReason"]',
   returnMessage: 'input[id="returnMessage"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Return application ');
  },

  async returnApplication() {
    await I.waitForPage('h1', 'Return application');

    await I.click(this.fields.consentOrderNotProvided);
    await I.click(this.fields.miamCertificateNotProvided);
    await I.click(this.fields.incompleteEvidenceOfMiamExamption);
    await I.click(this.fields.confidentalDetailListed);
    await I.click(this.fields.clarificationNeeded);
    await I.click(this.fields.otherReason);
    await I.click('Continue');

    await I.see('Return message');

    const text = await page.evaluate(() => {
            const rm = document.getElementById(this.fields.returnMessage);
            return rm.textContent;
        })

    const fs = require("fs");

    fs.readFile('test/resource' + "/returnApplicationContent.txt", (error, data) => {
        if(error) {
            throw error;
        }
        const dataString = data.toString());
    });

    await expect(text).toBe(dataString)

    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  },

  async runEventHappyPathReturnApplication() {
    await this.triggerEvent();
    await this.returnApplication();

    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
