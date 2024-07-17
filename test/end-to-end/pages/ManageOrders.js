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
    isTheOrderAboutChildrenDA_No: '#isTheOrderAboutChildren_No',
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
    doYouWantToServeOrder_No: '#doYouWantToServeOrder_No',
    selectOrderToServe: '//input[contains(@id,\'serveOrderDynamicList_\')]',
    servePersonallyOptions_Yes: '#serveToRespondentOptions_Yes',
    servingRespondentsOptionsCA_applicantLegalRepresentative: '#servingRespondentsOptionsCA-applicantLegalRepresentative',
    cafcassCymruServedOptions_No: '#cafcassCymruServedOptions_No',
    hearingOutcomeTxtBoxDA: '#fl404CustomFields_fl404bHearingOutcome',
    draftOrderLink: '//a[contains(text(),\'raft.pdf\')]',
    isTheOrderUploadedByConsent_Yes: '#isTheOrderUploadedByConsent_Yes',
    dateOrderMade_day: '#dateOrderMade-day',
    dateOrderMade_month: '#dateOrderMade-month',
    dateOrderMade_year: '#dateOrderMade-year',
    uploadOrderDoc: '#uploadOrderDoc',
    nameOfJudgeToReviewOrder: '#nameOfJudgeToReviewOrder',
    otherPartiesToServe: '//input[contains(@id,\'otherParties_\')]',
    judgeNamePopup: '//div/div/div/div/mat-option[@id="mat-option-4"]/span[contains(text(), \'Raja Main\')]',
    legalAdviserListToReviewOrder: '#nameOfLaToReviewOrder',
    tabSelector: '//div[contains(text(), "Draft orders")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron'
  },
  async selectOrder(modeOfOrder) {
    await I.retry(retryCount).triggerEvent('Manage orders');
    await I.retry(retryCount).waitForText('What do you want to do?');
    await I.retry(retryCount).click(modeOfOrder);
    await I.retry(retryCount).continueEvent();
  },
  async selectTypeOfOrderForUpload(orderName) {
    await I.retry(retryCount).waitForText('Upload an order');
    await I.retry(retryCount).waitForText('Select an order');
    await I.retry(retryCount).click(orderName);
    await I.retry(retryCount).click(this.fields.isTheOrderUploadedByConsent_Yes);
    await I.retry(retryCount).continueEvent();
  },
  async uploadOrder() {
    await I.retry(retryCount).waitForText('Approval Date (Optional)');
    await I.retry(retryCount).fillField(this.fields.dateOrderMade_day, '11');

    await I.retry(retryCount).fillField(this.fields.dateOrderMade_month, '11');

    await I.retry(retryCount).fillField(this.fields.dateOrderMade_year, '2022');

    await I.retry(retryCount).click(this.fields.OrderAboutAllChildren_Yes);
    await I.retry(retryCount).attachFile(this.fields.uploadOrderDoc, '../resource/dummy.pdf');
    await I.wait('6');
    await I.retry(retryCount).continueEvent();
  },
  async checkOrderBy(checkBy, judgeOrLA) {
    await I.retry(retryCount).waitForText(checkBy);
    await I.retry(retryCount).click(checkBy);
    if (checkBy === 'A judge or legal adviser needs to check the order') {
      await this.checkByJudgeorLA(judgeOrLA);
    }
    if (checkBy === 'A manager needs to check the order') {
      await I.retry(retryCount).waitForText('This will go to a manager to be checked');
    }
    await I.retry(retryCount).continueEvent();
    await I.wait('3');
  },
  async checkByJudgeorLA(judgeOrLA) {
    await I.retry(retryCount).click(judgeOrLA);
    if (judgeOrLA === 'Judge') {
      await I.wait('2');
      await I.retry(retryCount).fillField(this.fields.nameOfJudgeToReviewOrder, 'Raja Main');
      await I.wait('5');
      await I.getElementById('#mat-option-4').click();
    }
    if (judgeOrLA === 'Legal advisor') {
      await I.retry(retryCount).selectOption(this.fields.legalAdviserListToReviewOrder, 'Ahir(crd_func_test_2.0_rdcc_3831_74@justice.gov.uk)');
    }
  },
  async serveOrderType(orderType, serveNow, draftOrFinalise) {
    await I.retry(retryCount).waitForText('When do you want to serve the order?');
    await I.retry(retryCount).selectOption(this.fields.typeOfOrder, orderType);
    // await I.wait('2');
    if (orderType === 'Final') {
      await I.retry(retryCount).click(this.fields.doesOrderClosesCase_Yes);
    }
    await I.retry(retryCount).click(this.fields.cafcassOrCymruNeedToProvideReport_No);
    await I.retry(retryCount).click(this.fields.orderEndsInvolvementOfCafcassOrCymru_No);
    await this.doYouWantToServeOrderNow(serveNow, draftOrFinalise);
    await I.retry(retryCount).continueEvent();
    // await I.wait('5');
  },
  async doYouWantToServeOrderNow(serveNow, draftOrFinalise) {
    if (serveNow === 'Yes') {
      await I.retry(retryCount).click(this.fields.doYouWantToServeOrder_Yes);
    } else {
      await I.retry(retryCount).click(this.fields.doYouWantToServeOrder_No);
    }
    if (serveNow === 'No') {
      await I.retry(retryCount).click(draftOrFinalise);
      await I.wait('2');
    }
  },
  async selectOrderToServe() {
    // await I.retry(retryCount).waitForText('Serve saved orders');
    await I.retry(retryCount).click(this.fields.selectOrderToServe);
    await I.retry(retryCount).continueEvent();
    // await I.wait('5');
  },
  async servePersonalOrNonPersonal(personal, responsible) {
    if (personal === 'Yes') {
      await I.retry(retryCount).click(this.fields.servePersonallyOptions_Yes);
      // await I.wait('1');
      await I.retry(retryCount).click(responsible);
    }
    await I.retry(retryCount).click(this.fields.otherPartiesToServe);
    await I.retry(retryCount).click(this.fields.cafcassCymruServedOptions_No);
    await I.retry(retryCount).continueEvent();
    // await I.wait('8');
  },
  async checkYourAnswersAndSubmit() {
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Submit');
    // await I.wait('5');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  },
  async createAnOrderC21() {
    await this.selectOrder('Create an order');
    await I.waitForElement('#createSelectOrderOptions-blankOrderOrDirections');
    await I.retry(retryCount).click('Blank order or directions (C21)');
    await I.retry(retryCount).continueEvent();
    await I.waitForElement('#c21OrderOptions-c21other');
    await I.retry(retryCount).click('Blank order or directions (C21): Other');
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
    await this.fillGenericScreen();
    await I.retry(retryCount).click(this.fields.OrderAboutAllChildren_Yes);
    await I.retry(retryCount).fillField(this.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).fillField(this.fields.orderDirections, 'TEST ORDER DIRECTIONS');
    await I.retry(retryCount).fillField(this.fields.furtherDirections, 'TEST FURTHER DIRECTIONS');
    await I.retry(retryCount).fillField(this.fields.furtherInformation, 'TEST FURTHER INFORMATION');
    await I.retry(retryCount).continueEvent();
  },
  async manageOrderUploadOrderServeNowPersonally() {
    await this.selectOrder('Upload an order');
    await this.selectTypeOfOrderForUpload('Blank order or directions (C21)');
    await this.uploadOrder();
    await this.checkOrderBy('No checks are required');
    await this.serveOrderType('General', 'Yes', 'Finalise the order, and save to serve later');
    await this.selectOrderToServe();
    await this.servePersonalOrNonPersonal('Yes', 'Applicant\'s legal representative');
    await this.checkYourAnswersAndSubmit();
  },

  async manageOrderUploadOrderForJudgeReview() {
    await this.selectOrder('Upload an order');
    await this.selectTypeOfOrderForUpload('Blank order or directions (C21)');
    await this.uploadOrder();
    await this.checkOrderBy('A judge or legal adviser needs to check the order', 'Legal advisor');
    await this.checkYourAnswersAndSubmit();
  },

  async fillGenericScreen() {
    await I.waitForElement(this.fields.orderByConsent_Yes);
    await I.retry(retryCount).click(this.fields.orderByConsent_Yes);
    await I.retry(retryCount).click(this.fields.orderApprovedAtHearing_No);
    await I.retry(retryCount).click(this.fields.judgeTitle_HerHonourJudge);
    await I.retry(retryCount).fillField(this.fields.judgeLastName, 'JUDGE FULL NAME');
    await I.retry(retryCount).fillField(this.fields.legalAdviserFullName, 'JUDGE LEGAL ADV FULL NAME');
    await I.retry(retryCount).fillField(this.fields.orderMade_day, '17');
    await I.retry(retryCount).fillField(this.fields.orderMade_month, '10');
    await I.retry(retryCount).fillField(this.fields.orderMade_year, '2022');
    await I.wait('1');
    // await I.retry(retryCount).click(this.fields.OrderAboutAllChildren_Yes);
  },
  async submitManageOrder() {
    await I.retry(retryCount).continueEvent();
    await I.waitForElement('#amendOrderSelectCheckOptions-judgeOrLegalAdvisorCheck');
    await I.retry(retryCount).click('#amendOrderSelectCheckOptions-managerCheck');
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).click('Submit');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await I.wait('4');
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.retry(retryCount).click(this.fields.tabSelector);
    await I.retry(retryCount).waitForText('Blank order or directions (C21): Other');
  }
};
