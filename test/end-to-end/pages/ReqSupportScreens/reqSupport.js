'use strict';
const I = actor();

// const reqSupportConfig = require('./reqSupportConfig');

const date = new Date();

module.exports = {
  fields: {
    firstApplicantEle: '#flag-location-0',
    applicantSolEle: '#flag-location-1',
    nextBtn: 'Next',
    reasonableAdjustmentEle: '//ccd-select-flag-type//label[contains(text(),"Reasonable adjustment")]',
    flagTypeEle: '#flag-location-0',
    requestExplanationEle: '#flagComments',
    submitBtn: 'Submit',
    supportTabSelector: '//div[contains(text(), "Support")]',
    flagEleForFirstApplicant: '//table/caption[contains(text(), \'John Doe\')]/../tbody[2]/tr/td[1]/div[1]',
    commentEleForFirstApplicant: '//table/caption[contains(text(), \'John Doe\')]/../tbody[2]/tr/td[2]/div[1]',
    flagStatusEleForFirstApplicant: '//table/caption[contains(text(), \'John Doe\')]/../tbody[2]/tr/td[5]/strong',
    flagEleForAppSolicitor: '//table/caption[contains(text(), \'Legal Solicitor\')]/../tbody[2]/tr/td[1]/div[1]',
    commentEleForAppSolicitor: '//table/caption[contains(text(), \'Legal Solicitor\')]/../tbody[2]/tr/td[2]/div[1]',
    flagStatusEleForAppSolicitor: '//table/caption[contains(text(), \'Legal Solicitor\')]/../tbody[2]/tr/td[5]/strong'
  },

  async selectOrder() {
    await I.triggerEvent('Request support');
    await I.waitForText('Who is the support for?');
  },

  async submitSupportRequestForApplicant() {
    await I.click(this.fields.firstApplicantEle);
    await I.click(this.fields.nextBtn);

    await I.waitForElement(this.fields.reasonableAdjustmentEle);
    await I.click(this.fields.reasonableAdjustmentEle);
    await I.click(this.fields.nextBtn);

    const alternameDocFormatEle = '//ccd-select-flag-type//label[contains(text(),"I need documents in an alternative format")]';
    await I.waitForElement(alternameDocFormatEle);
    await I.click(alternameDocFormatEle);
    await I.click(this.fields.nextBtn);

    const documentInLargePrintEle = '//ccd-select-flag-type//label[contains(text(),"Documents in large print")]';
    await I.waitForElement(documentInLargePrintEle);
    await I.click(documentInLargePrintEle);
    await I.click(this.fields.nextBtn);

    await I.waitForText('Tell us more about the request (optional)');
    await I.fillField(this.fields.requestExplanationEle, 'This is a test, please ignore');
    await I.click(this.fields.nextBtn);

    await I.waitForText('Review support request');
    await I.see('Documents in large print');
    await I.see('This is a test, please ignore');
    await I.see('Requested');
    await I.click(this.fields.submitBtn);
  },


  async submitSupportRequestForAppSolicitor() {
    await I.click(this.fields.applicantSolEle);
    await I.click(this.fields.nextBtn);

    await I.waitForElement(this.fields.reasonableAdjustmentEle);
    await I.click(this.fields.reasonableAdjustmentEle);
    await I.click(this.fields.nextBtn);

    const needHelpWithFormsEle = '//ccd-select-flag-type//label[contains(text(),"I need help with forms")]';
    await I.waitForElement(needHelpWithFormsEle);
    await I.click(needHelpWithFormsEle);
    await I.click(this.fields.nextBtn);

    const supportFillingFormsEle = '//ccd-select-flag-type//label[contains(text(),"Support filling in forms")]';
    await I.waitForElement(supportFillingFormsEle);
    await I.click(supportFillingFormsEle);
    await I.click(this.fields.nextBtn);

    await I.waitForText('Tell us more about the request (optional)');
    await I.fillField(this.fields.requestExplanationEle, 'This is a Solicitor test, please ignore');
    await I.click(this.fields.nextBtn);

    await I.waitForText('Review support request');
    await I.see('Support filling in forms');
    await I.see('This is a Solicitor test, please ignore');
    await I.see('Requested');
    await I.click(this.fields.submitBtn);
  },

  async verifySupportRequestCreated() {
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.click(this.fields.supportTabSelector);

    // verify applicant request details
    await I.seeInField(this.fields.flagEleForFirstApplicant, 'Documents in large print');
    await I.seeInField(this.fields.commentEleForFirstApplicant, 'This is a test, please ignore');
    await I.seeInField(this.fields.flagStatusEleForFirstApplicant, 'REQUESTED');
    await I.see(formattedDate);

    // verify applicant solicitor request details
    await I.seeInField(this.fields.flagEleForAppSolicitor, 'Support filling in forms');
    await I.seeInField(this.fields.commentEleForAppSolicitor, 'This is a Solicitor test, please ignore');
    await I.seeInField(this.fields.flagStatusEleForAppSolicitor, 'REQUESTED');
    await I.see(formattedDate);
  },

  async requestSupportForParties() {
    await this.selectOrder();
    await this.submitSupportRequestForApplicant();

    await this.selectOrder();
    await this.submitSupportRequestForAppSolicitor();

    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifySupportRequestCreated();
  }


};