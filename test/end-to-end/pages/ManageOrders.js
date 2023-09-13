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
    orderAboutAllChildren_No: '#isTheOrderAboutAllChildren_No',
    allChildrenList: '//p[contains(text(),\'Child \')]',
    recticalsOrPreambels: '#recitalsOrPreamble',
    orderDirections: '#orderDirections',
    furtherDirections: '#furtherDirectionsIfRequired',
    furtherInformation: '#furtherInformationIfRequired',
    typeOfOrder: '#selectTypeOfOrder',
    doesOrderClosesCase_Yes: '#doesOrderClosesCase_Yes',
    cafcassOrCymruNeedToProvideReport_No: '#cafcassOrCymruNeedToProvideReport_No',
    orderEndsInvolvementOfCafcassOrCymru_No: '#orderEndsInvolvementOfCafcassOrCymru_No',
    doYouWantToServeOrder_Yes: '#doYouWantToServeOrder_Yes',
    selectOrderToServe: '//p[contains(text(),\'Blank order or directions (C21)\')]',
    servePersonallyOptions_Yes: '#serveToRespondentOptions_Yes',
    servingRespondentsOptionsCA_applicantLegalRepresentative: '#servingRespondentsOptionsCA-applicantLegalRepresentative',
    cafcassCymruServedOptions_No: '#cafcassCymruServedOptions_No'
  },
  async selectOrder() {
    await I.retry(retryCount).triggerEvent('Manage orders');
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
  async selectOrderC21application_refused() {
    await I.retry(retryCount).click('Blank order or directions (C21)');
    await I.retry(retryCount).click('Continue');
    await I.retry(retryCount).click('Blank order or directions (C21): application refused');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
  },
  async createAnOrderC21_applicationrefused_AllChildrenNo() {
    await this.selectOrder();
    await this.selectOrderC21application_refused();
    await this.fillGenericScreen();
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.orderAboutAllChildren_No);
    await I.retry(retryCount).click(this.fields.allChildrenList);
    await I.retry(retryCount).fillField(this.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).click('Continue');
    await I.wait('7');
  },

  async createAnOrderC21_applicationrefused_AllChildrenYes() {
    await this.selectOrder();
    await this.selectOrderC21application_refused();
    await this.fillGenericScreen();
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).click('Continue');
    await I.wait('7');
  },

  async fillGenericScreen() {
    await I.runAccessibilityTest();
    await I.wait('3');
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
  },
  async checkOrder_nochecks() {
    await I.wait('2');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).click('No checks are required');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
  },
  async serveOrder_Final() {
    await I.retry(retryCount).selectOption(this.fields.typeOfOrder, 'Final');
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.doesOrderClosesCase_Yes);
    await I.retry(retryCount).click(this.fields.cafcassOrCymruNeedToProvideReport_No);
    await I.retry(retryCount).click(this.fields.orderEndsInvolvementOfCafcassOrCymru_No);
    await I.retry(retryCount).click(this.fields.doYouWantToServeOrder_Yes);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },
  async selectOrderToServe() {
    await I.retry(retryCount).click(this.fields.selectOrderToServe);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },
  async servePersonally_Legalrep() {
    await I.retry(retryCount).click(this.fields.servePersonallyOptions_Yes);
    await I.retry(retryCount).click(this.fields.servingRespondentsOptionsCA_applicantLegalRepresentative);
    await I.retry(retryCount).click(this.fields.cafcassCymruServedOptions_No);
    await I.retry(retryCount).click('Continue');
    await I.wait('8');
    await I.retry(retryCount).click('Submit');
    await I.wait('5');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  },
  async serveFinalOrder() {
    await this.checkOrder_nochecks();
    await this.serveOrder_Final();
    await this.selectOrderToServe();
    await this.servePersonally_Legalrep();
    await I.retry(retryCount).waitForText('Gatekeeping');
  },
  async serveFinalOrder_CaseClosed() {
    await this.checkOrder_nochecks();
    await this.serveOrder_Final();
    await this.selectOrderToServe();
    await this.servePersonally_Legalrep();
    await I.retry(retryCount).waitForText('Closed');
  }

};