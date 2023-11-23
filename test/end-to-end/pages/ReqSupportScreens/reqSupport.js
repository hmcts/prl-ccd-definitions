'use strict';
const I = actor();

// const reqSupportConfig = require('./reqSupportConfig');

const date = new Date();

module.exports = {
  fields: {
    firstApplicantEle: '#flag-location-0',
    applicantSolEle: '#flag-location-1',
    nextBtn: 'Next',
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

    await I.waitForText('Reasonable adjustment');
    await I.click('Reasonable adjustment');
    await I.click(this.fields.nextBtn);

    await I.waitForText('I need documents in an alternative format');
    await I.click('I need documents in an alternative format');
    await I.click(this.fields.nextBtn);

    await I.waitForText('Documents in large print');
    await I.click('Documents in large print');
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

    await I.waitForText('Reasonable adjustment');
    await I.click('Reasonable adjustment');
    await I.click(this.fields.nextBtn);

    await I.waitForText('I need help with forms');
    await I.click('I need help with forms');
    await I.click(this.fields.nextBtn);

    await I.waitForText('Support filling in forms');
    await I.click('Support filling in forms');
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