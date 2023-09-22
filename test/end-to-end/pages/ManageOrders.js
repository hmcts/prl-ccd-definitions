const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    orderByConsent_Yes: '#isTheOrderByConsent_Yes',
    orderByConsent_No: '#isTheOrderByConsent_No',
    orderApprovedAtHearing_No: '#wasTheOrderApprovedAtHearing_No',
    judgeTitle_HerHonourJudge: '#judgeOrMagistrateTitle-herHonourJudge',
    judgeLastName: '#judgeOrMagistratesLastName',
    legalAdviserFullName: '#justiceLegalAdviserFullName',
    orderMade_day: '#dateOrderMade-day',
    orderMade_month: '#dateOrderMade-month',
    orderMade_year: '#dateOrderMade-year',
    OrderAboutAllChildren_Yes: '#isTheOrderAboutAllChildren_Yes',
    recticalsOrPreambels: '#recitalsOrPreamble',
    orderDirections: '#orderDirections',
    furtherDirections: '#furtherDirectionsIfRequired',
    furtherInformation: '#furtherInformationIfRequired'
  },
  async selectOrder() {
    await I.retry(retryCount).triggerEvent('Manage orders');
    await I.wait('3');
    await I.retry(retryCount).click('Create an order');
    await I.retry(retryCount).click('Continue');
  },

  async createAnOrderC21() {
    await this.selectOrder();
    await I.retry(retryCount).click('Blank order or directions (C21)');
    await I.retry(retryCount).click('Continue');
    await I.retry(retryCount).click('Blank order or directions (C21): Other');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await this.fillGenericScreen();
    await I.retry(retryCount).fillField(this.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).fillField(this.fields.orderDirections, 'TEST ORDER DIRECTIONS');
    await I.retry(retryCount).fillField(this.fields.furtherDirections, 'TEST FURTHER DIRECTIONS');
    await I.retry(retryCount).fillField(this.fields.furtherInformation, 'TEST FURTHER INFORMATION');
    await I.retry(retryCount).click('Continue');
    await I.wait('7');
  },

  async fillGenericScreen() {
    await I.retry(retryCount).click(this.fields.orderByConsent_Yes);
    await I.retry(retryCount).click(this.fields.orderApprovedAtHearing_No);
    await I.retry(retryCount).click(this.fields.judgeTitle_HerHonourJudge);
    await I.retry(retryCount).fillField(this.fields.judgeLastName, 'JUDGE FULL NAME');
    await I.retry(retryCount).fillField(this.fields.legalAdviserFullName, 'JUDGE LEGAL ADV FULL NAME');
    await I.retry(retryCount).fillField(this.fields.orderMade_day, '17');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.orderMade_month, '10');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.orderMade_year, '2022');
    await I.wait('1');
    await I.retry(retryCount).click(this.fields.OrderAboutAllChildren_Yes);
  },
  async submitManageOrder() {
    await I.wait('2');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).click('A judge or legal adviser needs to check the order');
    await I.retry(retryCount).click('Judge');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).click('Submit');
    await I.wait('5');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await I.wait('4');
    await I.retry(retryCount).click('Draft orders');
    await I.retry(retryCount).waitForText('Blank order or directions (C21): Other');
  }
};
