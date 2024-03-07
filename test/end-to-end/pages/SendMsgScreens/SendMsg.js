'use strict';
const I = actor();

const sendMsgConfig = require('./sendMsgConfig');

module.exports = {

  fields: {
    sendMsgEle: '#chooseSendOrReply-SEND',
    replyMsgEle: '#chooseSendOrReply-REPLY',
    chooseInternalUserField: '#sendMessageObject_internalOrExternalMessage-INTERNAL',
    chooseUserType: '#sendMessageObject_internalMessageWhoToSendTo-JUDICIARY',
    chooseJudicialType: '#sendMessageObject_judicialOrMagistrateTierList',
    judgeNameField: '#sendMessageObject_sendReplyJudgeName',
    dropDownEle: '//div/div/div/div/mat-option[1]/span',
    isUrgentEle: '#sendMessageObject_internalMessageUrgent_No',
    selectMessageReason: '#sendMessageObject_messageAbout-REVIEW_SUBMITTED_DOCUMENTS',
    messageSubjEle: '#sendMessageObject_messageSubject',
    docListEle: '#sendMessageObject_submittedDocumentsList',
    messageContentEle: '#messageContent',
    messageTab: '//div[contains(text(), \'Messages\')]',
    messageRows: 'tbody .new-table-row',
    expandEle: '//td[7]/div/a/img',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron',
    msgReplyDropDown: '#messageReplyDynamicList',
    respToMsgYes: '#respondToMessage_Yes',
    replyToAdminEle: '#replyMessageObject_internalMessageReplyTo-COURT_ADMIN',
    notUrgentReplyEle: '#replyMessageObject_internalMessageUrgent_No',
    judgeReplyText: '#replyMessageObject_messageContent'
  },

  async selectEvent() {
    await I.triggerEvent(sendMsgConfig.sendEvent);
    await I.waitForText(sendMsgConfig.questionText);
    await I.click(this.fields.sendMsgEle);
    await I.click(sendMsgConfig.continueText);
  },

  async chooseMessageTypeAndReceiver() {
    await I.waitForText(sendMsgConfig.whoMsgQuestion);
    await I.click(this.fields.chooseInternalUserField);
    await I.waitForText(sendMsgConfig.selectReceiverText);
    await I.click(this.fields.chooseUserType);
    await I.selectOption(this.fields.chooseJudicialType, sendMsgConfig.judgeType);
    await I.fillField(this.fields.judgeNameField, sendMsgConfig.judgeName);
    await I.waitForVisible('input[aria-expanded="true"]');
    await I.click(this.fields.dropDownEle);

    await I.click(this.fields.isUrgentEle);
    await I.click(this.fields.selectMessageReason);

    await I.waitForText(sendMsgConfig.enterSubjMessageField);
    await I.fillField(this.fields.messageSubjEle, sendMsgConfig.enterSubjMessageValue);

    await I.selectOption(this.fields.docListEle, 'Applications -> Applicant Documents -> Applicant Application -> C100FinalDocument.pdf');
    await I.click(sendMsgConfig.continueText);
  },

  async addMessage() {
    await I.waitForText(sendMsgConfig.enterMessageField);
    await I.fillField(this.fields.messageContentEle, sendMsgConfig.enterMessageValue);
    await I.click(sendMsgConfig.continueText);

    await I.waitForText(sendMsgConfig.cyaText);
    await I.click(sendMsgConfig.saveAndContinue);
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async verifyAdminMessage() {
    await I.clickTillElementFound(this.fields.messageTab, this.fields.nextBtnSelector);
    await I.click(this.fields.messageTab);
    await I.see(sendMsgConfig.sendEvent);
    await I.seeNumberOfElements(this.fields.messageRows, 1);
    await I.see(sendMsgConfig.msgStatus);
    await I.click(this.fields.expandEle);
    await I.see(sendMsgConfig.judgeFullName);
    await I.see(sendMsgConfig.messageType);
    await I.see(sendMsgConfig.queriedFileName);
  },

  async verifyJudgeReply() {
    await I.clickTillElementFound(this.fields.messageTab, this.fields.nextBtnSelector);
    await I.click(this.fields.messageTab);
    await I.see(sendMsgConfig.sendEvent);
    await I.seeNumberOfElements(this.fields.messageRows, 1);
    await I.see(sendMsgConfig.msgStatus);
    await I.click(this.fields.expandEle);
    await I.see(sendMsgConfig.judgeFullName);
    await I.see(sendMsgConfig.judgeEmail);
    await I.see(sendMsgConfig.messageType);
    await I.see(sendMsgConfig.queriedFileName);
    await I.see('Test Judge reply');
  },

  async triggerReplyEvent() {
    await I.triggerEvent(sendMsgConfig.sendEvent);
    await I.waitForText(sendMsgConfig.questionText);
    await I.click(this.fields.replyMsgEle);

    await I.waitForText(sendMsgConfig.replyMessageSelectionText);
    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.msgReplyDropDown, option);
    await I.click(sendMsgConfig.continueText);
  },

  async respondToMsg() {
    await I.waitForText(sendMsgConfig.respMsgText);
    await I.click(this.fields.respToMsgYes);
    await I.click(sendMsgConfig.continueText);

    await I.waitForText(sendMsgConfig.receiverUserTypeFieldText);
    await I.click(this.fields.replyToAdminEle);
    await I.click(this.fields.notUrgentReplyEle);
    await I.fillField(this.fields.judgeReplyText, 'Test Judge reply');
    await I.click(sendMsgConfig.continueText);

    await I.waitForText(sendMsgConfig.cyaText);
    await I.click(sendMsgConfig.saveAndContinue);
    await I.click(sendMsgConfig.returnToCaseDetails);
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async sendInternalMsgToJudge() {
    await this.selectEvent();
    await this.chooseMessageTypeAndReceiver();
    await this.addMessage();
  },

  async reviewMessageAsJudge() {
    await this.verifyAdminMessage();
  },

  async respondToMessageAsJudge() {
    await this.triggerReplyEvent();
    await this.respondToMsg();
    await this.verifyJudgeReply();
  }
};