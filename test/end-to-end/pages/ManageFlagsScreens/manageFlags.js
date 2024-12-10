'use strict';
const I = actor();
const manageFlagConfig = require('./manageFlagsConfig');

const date = new Date();

function getFlagStatusRadioElement(status) {
  return `//label[contains(text(),'${status}')]/../input`;
}

module.exports = {
  fields: {
    firstFlagSelectionEle: '#flag-selection-0',
    secondFlagSelectionEle: '#flag-selection-1',
    statusReasonChange: '#flagStatusReasonChange',
    nextBtn: 'Next',
    submitBtn: 'Submit',
    caseFlagsTabSelector: '//div[contains(text(), "Case Flags")]',
    flagEleForFirstApplicant: '//table/caption[contains(text(), \'John Doe\')]/../tbody[2]/tr/td[1]/div[1]',
    commentEleForFirstApplicant: '//table/caption[contains(text(), \'John Doe\')]/../tbody[2]/tr/td[2]/div[1]',
    flagStatusEleForFirstApplicant: '//table/caption[contains(text(), \'John Doe\')]/../tbody[2]/tr/td[5]/strong',
    flagEleForAppSolicitor: '//table/caption[contains(text(), \'Legal Solicitor\')]/../tbody[2]/tr/td[1]/div[1]',
    commentEleForAppSolicitor: '//table/caption[contains(text(), \'Legal Solicitor\')]/../tbody[2]/tr/td[2]/div[1]',
    flagStatusEleForAppSolicitor: '//table/caption[contains(text(), \'Legal Solicitor\')]/../tbody[2]/tr/td[5]/strong'
  },

  async selectCaseFlags() {
    await I.triggerEvent(manageFlagConfig.flagEvent);
    await I.waitForText(manageFlagConfig.flagName);
  },

  async reviewFlagsForApproval() {
    await I.click(this.fields.firstFlagSelectionEle);
    await I.click(this.fields.nextBtn);

    await I.waitForText('Documents in large print');
    const activeStatusRadioElement = getFlagStatusRadioElement('Active');
    await I.waitForElement(activeStatusRadioElement);
    await I.click(activeStatusRadioElement);
    await I.click(this.fields.nextBtn);

    await I.waitForText(manageFlagConfig.cyaTextTitle);
    await I.see(manageFlagConfig.flagChildValue);
    await I.see(manageFlagConfig.flagComments);
    await I.see(manageFlagConfig.flagActiveState);
    await I.click(this.fields.submitBtn);
  },

  async reviewFlagsForNonApproval() {
    await I.click(this.fields.secondFlagSelectionEle);
    await I.click(this.fields.nextBtn);

    await I.waitForText('Support filling in forms');
    const notApprovedStatusRadioElement = getFlagStatusRadioElement('Not approved');
    await I.waitForElement(notApprovedStatusRadioElement);
    await I.click(notApprovedStatusRadioElement);
    await I.fillField(this.fields.statusReasonChange, 'This is a test for non-approval');
    await I.click(this.fields.nextBtn);

    await I.waitForText(manageFlagConfig.cyaTextTitle);
    await I.see(manageFlagConfig.secondFlagChildValue);
    await I.see(manageFlagConfig.secondFlagComments);
    await I.see(manageFlagConfig.flagNotApprovedState);
    await I.click(this.fields.submitBtn);
    await I.waitForElement(this.fields.caseFlagsTabSelector);
  },

  async verifyApprovedSupportRequest() {
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.waitForElement(this.fields.caseFlagsTabSelector);
    await I.click(this.fields.caseFlagsTabSelector);

    // verify applicant request details
    await I.seeInField(this.fields.flagEleForFirstApplicant, manageFlagConfig.flagChildValue);
    await I.seeInField(this.fields.commentEleForFirstApplicant, manageFlagConfig.flagComments);
    await I.seeInField(this.fields.flagStatusEleForFirstApplicant, 'ACTIVE');
    await I.see(formattedDate);

    // verify applicant solicitor request details
    await I.seeInField(this.fields.flagEleForAppSolicitor, manageFlagConfig.secondFlagChildValue);
    await I.seeInField(this.fields.commentEleForAppSolicitor, manageFlagConfig.secondFlagComments);
    await I.seeInField(this.fields.flagStatusEleForAppSolicitor, 'NOT APPROVED');
    await I.see(formattedDate);
  },

  async reviewSupportRequestForParties() {
    await this.selectCaseFlags();
    await this.reviewFlagsForApproval();

    await this.selectCaseFlags();
    await this.reviewFlagsForNonApproval();
    await this.verifyApprovedSupportRequest();
  }
};