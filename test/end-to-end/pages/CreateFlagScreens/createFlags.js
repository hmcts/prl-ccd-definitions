'use strict';
const I = actor();
const createFlagsConfig = require('./createFlagsConfig');

const date = new Date();

module.exports = {
  fields: {
    nextBtn: 'Next',
    submitBtn: 'Submit',
    sixthFlagSlectionEle: '#flag-location-6',
    vulnerableUserEle: '#flag-type-2',
    raEle: '#flag-type-1',
    sixthRaFlagChildEle: '#flag-type-6',
    secondRaFlagSubChildEle: '#flag-type-1',
    activeStatusEle: '#flag-status-1',
    flagComments: '#flagComments',
    caseFlagsTabSelector: '//div[contains(text(), "Case Flags")]',
    supportTabSelector: '//div[contains(text(), "Support")]',
    nonRAFlagEleForSolicitorApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr[1]/td[1]/div[1]',
    nonRACommentEleForSolicitorApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr[1]/td[2]/div[1]',
    nonRAflagStatusEleForFirstApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr[1]/td[5]/strong',
    raFlagEleForSolicitorApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr[2]/td[1]/div[1]',
    raCommentEleForSolicitorApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr[2]/td[2]/div[1]',
    raflagStatusEleForFirstApplicant: '//table/caption[contains(text(), "Sr Legal Solicitor")]/../tbody[2]/tr[2]/td[5]/strong'
  },

  async selectCreateFlags() {
    await I.triggerEvent(createFlagsConfig.flagEvent);
    await I.waitForText(createFlagsConfig.flagHeading);
    await I.click(this.fields.sixthFlagSlectionEle);
    await I.click(this.fields.nextBtn);
  },

  async selectNonReasonableFlagType() {
    await I.click(this.fields.vulnerableUserEle);
    await I.click(this.fields.nextBtn);
    await I.waitForText(createFlagsConfig.flagCommentsTitle);
    await I.fillField(this.fields.flagComments, createFlagsConfig.nonRAFlagCommentsText);

    // Active status pre-selected
    await I.click(this.fields.nextBtn);

    // Active status pre-selected
    await I.click(this.fields.nextBtn);

    await I.waitForText(createFlagsConfig.cyaTextTitle);
    await I.see(createFlagsConfig.legalSolicitorName);
    await I.see(createFlagsConfig.nonRAFlagType);
    await I.see(createFlagsConfig.nonRAFlagCommentsText);
    await I.see(createFlagsConfig.flagActiveState);
    await I.click(this.fields.submitBtn);
  },

  async selectReasonableFlagType() {
    await I.click(this.fields.raEle);
    await I.click(this.fields.nextBtn);

    await I.click(this.fields.sixthRaFlagChildEle);
    await I.click(this.fields.nextBtn);

    await I.click(this.fields.secondRaFlagSubChildEle);
    await I.click(this.fields.nextBtn);

    await I.fillField(this.fields.flagComments, createFlagsConfig.raFlagCommentsText);
    await I.click(this.fields.nextBtn);

    await I.click(this.fields.activeStatusEle);
    await I.click(this.fields.nextBtn);

    await I.waitForText(createFlagsConfig.cyaTextTitle);
    await I.see(createFlagsConfig.legalSolicitorName);
    await I.see(createFlagsConfig.raFlagSubChildValue);
    await I.see(createFlagsConfig.raFlagCommentsText);
    await I.see(createFlagsConfig.flagActiveState);
    await I.click(this.fields.submitBtn);
  },

  async verifyCaseFlagsCreated() {
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.click(this.fields.caseFlagsTabSelector);

    // verify applicant request details
    await I.seeInField(this.fields.nonRAFlagEleForSolicitorApplicant, createFlagsConfig.nonRAFlagType);
    await I.seeInField(this.fields.nonRACommentEleForSolicitorApplicant, createFlagsConfig.nonRAFlagCommentsText);
    await I.seeInField(this.fields.nonRAflagStatusEleForFirstApplicant, 'ACTIVE');
    await I.see(formattedDate);

    // verify applicant solicitor request details
    await I.seeInField(this.fields.raFlagEleForSolicitorApplicant, createFlagsConfig.raFlagSubChildValue);
    await I.seeInField(this.fields.raCommentEleForSolicitorApplicant, createFlagsConfig.raFlagCommentsText);
    await I.seeInField(this.fields.raflagStatusEleForFirstApplicant, 'ACTIVE');
    await I.see(formattedDate);
  },

  async createFlags() {
    await this.selectCreateFlags();
    await this.selectNonReasonableFlagType();

    await this.selectCreateFlags();
    await this.selectReasonableFlagType();

    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifyCaseFlagsCreated();
  }

};