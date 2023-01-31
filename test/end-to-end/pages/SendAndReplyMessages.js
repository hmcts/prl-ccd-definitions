const I = actor();

module.exports = {
  fields: {
    headerText: 'Send and reply to messages',
    sendMessage: '#chooseSendOrReply-SEND',
    replyMessage: '#chooseSendOrReply-REPLY',
    recipientEmailAddress: '#messageObject_recipientEmail',
    sendMessageSubject: '#messageObject_messageSubject',
    sendMessageUrgency: '#messageObject_messageUrgency',
    sendMessageContent: '#messageContent',
    replyMessageYes: '#messageReply_isReplying_Yes',
    replyMessageNo: '#messageReply_isReplying_No',
    replyFromEmailAddress: '#messageReply_replyFrom',
    replyToEmailAddress: '#messageReply_replyTo',
    replyMessageContent: '#messageReply_messageContent'
  },

  async sendMessage() {
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    await I.click(this.fields.sendMessage);
    await I.click('Continue');
    await I.wait('2');
    await I.see('Recipient’s email address');
    await I.fillField(this.fields.recipientEmailAddress, 'fprl_caseworker_courtadm_test@mailinator.com');
    await I.fillField(this.fields.sendMessageSubject, 'Test Subject');
    await I.fillField(this.fields.sendMessageUrgency, 'Urgent');
    await I.click('Continue');
    await I.fillField(this.fields.sendMessageContent, 'Test Message');
    await I.click('Continue');
    await I.waitForText('Save and continue', '30');
    await I.click('Save and continue');
  }
};