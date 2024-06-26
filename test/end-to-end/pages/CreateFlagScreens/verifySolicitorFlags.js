'use strict';
const I = actor();
const createFlagsConfig = require('./createFlagsConfig');

const date = new Date();

module.exports = {
  fields: {
    nextBtn: 'Next',
    submitBtn: 'Submit',
    supportTabSelector: '//div[contains(text(), "Support")]',
    raFlagEleForSolicitorApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr/td[1]/div[1]',
    raCommentEleForSolicitorApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr/td[2]/div[1]',
    raflagStatusEleForFirstApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr/td[5]/strong'
  },

  async verifySolicitorOnlyFlags() {
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');
    await I.waitForElement(this.fields.supportTabSelector);
    await I.click(this.fields.supportTabSelector);

    // verify applicant solicitor request details
    await I.seeInField(this.fields.raFlagEleForSolicitorApplicant, createFlagsConfig.raFlagSubChildValue);
    await I.seeInField(this.fields.raCommentEleForSolicitorApplicant, createFlagsConfig.raFlagCommentsText);
    await I.seeInField(this.fields.raflagStatusEleForFirstApplicant, 'ACTIVE');
    await I.see(formattedDate);

    await I.dontSee(createFlagsConfig.nonRAFlagType);
    await I.dontSee(createFlagsConfig.nonRAFlagCommentsText);
  }
};
