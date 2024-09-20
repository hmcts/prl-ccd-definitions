/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

'use strict';
const I = actor();
const retryCount = 3;
const longWait = 30;
const medWait = 10;
const shortWait = 3;
const date = new Date();
const moConfig = require('./manageOrderConfig');


module.exports = {

  fields: {
    orderByConsent_Yes: '#isTheOrderByConsent_Yes',
    orderByConsent_No: '#isTheOrderByConsent_No',
    orderApprovedAtHearing_No: '#wasTheOrderApprovedAtHearing_No',
    judgeTitle_HerHonourJudge: '#judgeOrMagistrateTitle-herHonourJudge',
    judgeTitle_DistrictJudge: '#judgeOrMagistrateTitle-districtJudge',
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
    cafcassOrCymruNeedToProvideReport_Yes: '#cafcassOrCymruNeedToProvideReport_Yes',
    cafcassDocSelection: '#cafcassCymruDocuments-section7Report',
    reportFillDay: '#whenReportsMustBeFiled-day',
    reportFillMonth: '#whenReportsMustBeFiled-month',
    reportFillYear: '#whenReportsMustBeFiled-year',
    cafcassOrCymruNeedToProvideReport_No: '#cafcassOrCymruNeedToProvideReport_No',
    orderEndsInvolvementOfCafcassOrCymru_No: '#orderEndsInvolvementOfCafcassOrCymru_No',
    doYouWantToServeOrder_Yes: '#doYouWantToServeOrder_Yes',
    doYouWantToServeOrder_No: '#doYouWantToServeOrder_No',
    selectOrderToServe: '//input[contains(@id,\'serveOrderDynamicList_\')]',
    servePersonallyOptions_Yes: '#serveToRespondentOptions_Yes',
    servingRespondentsOptionsCA_applicantLegalRepresentative: '#servingRespondentsOptionsCA-applicantLegalRepresentative',
    cafcassCymruServedOptions_No: '#cafcassCymruServedOptions_No',
    cafcassCymruServedOptions_Yes: '#cafcassCymruServedOptions_Yes',
    addOtherOrg: '#serveOtherPartiesCA-anotherOrganisation',
    deliverByEmail: '#serveOrgDetailsList_0_serveByPostOrEmail-email',
    emailName: '#serveOrgDetailsList_0_emailInformation_emailName',
    emailAddress: '#serveOrgDetailsList_0_emailInformation_emailAddress',
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
    ordersTabSelector: '//div[contains(text(), "Orders")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron',
    selectDraftOrder: '#draftOrderOptions-draftAnOrder',
    selectC43AOrder: '#createSelectOrderOptions-specialGuardianShip',
    successElement: 'div.alert-message',
    selectDraftOrderForEditing: '#draftOrdersDynamicList',
    editOrderMyselfSolicitor: '#whatToDoWithOrderSolicitor-editTheOrderAndServe',
    editOrderMyselfCourtAdmin: '#whatToDoWithOrderCourtAdmin-editTheOrderAndServe',
    editOrder_no: '#doYouWantToEditTheOrder_No',
    judgeDirectionsToAdmin: '#judgeDirectionsToAdmin',
    isOrderCompleteToServe_Yes: '#isOrderCompleteToServe_Yes',
    selectOrderType: '#selectTypeOfOrder',
    guardianInputBox: '#appointedGuardianName_0_guardianFullName',
    judgeCheckOrderEle: '#amendOrderSelectCheckOptions-judgeOrLegalAdvisorCheck',
    caseManagerCheckOrderEle: '#amendOrderSelectCheckOptions-managerCheck',
    selectJudgeForOrderReview: '#amendOrderSelectJudgeOrLa-judge',
    judgeNameField: '#nameOfJudgeToReviewOrder',
    judgeAutoCompEle: 'span.mat-option-text',
    guardianNameEle: '#appointedGuardianName_0_guardianFullName',
    selectTheOrderToServe: '[name="serveOrderDynamicList"]',
    returnToTaskTab: 'div > div.govuk-form-group.govuk-form-group--error > a',
    assignToMe: '//exui-case-task/p/strong[contains(text(), "Review and Approve Legal rep Order")]/../../dl/div/dd/a',
    issueTaskName: '//a[contains(.,"Review and Approve Legal rep Order")]'
  },

  async selectOrder(modeOfOrder) {
    await I.retry(retryCount).triggerEvent('Manage orders');
    await I.retry(retryCount).waitForText('What do you want to do?');
    await I.retry(retryCount).click(modeOfOrder);
    await I.retry(retryCount).continueEvent();
  },

  async selectDraftOrder(modeOfOrder) {
    await I.triggerEvent(modeOfOrder);
    await I.waitForText(moConfig.draftOrderText);
    await I.click(this.fields.selectDraftOrder);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.selectOrderText);
    await I.click(this.fields.selectC43AOrder);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
  },

  async includeOrderDetails() {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    await I.wait('5');
    await I.waitForText(moConfig.c43AOrderText);
    await I.click(this.fields.orderByConsent_Yes);
    await I.click(this.fields.orderApprovedAtHearing_No);
    await I.click(this.fields.judgeTitle_HerHonourJudge);
    await I.fillField(this.fields.judgeLastName, moConfig.judgeNameText);
    await I.fillField(this.fields.legalAdviserFullName, moConfig.legalAdvisorNameText);
    await I.fillField(this.fields.orderMade_day, day);
    await I.fillField(this.fields.orderMade_month, month);
    await I.fillField(this.fields.orderMade_year, year);
    await I.click(this.fields.orderAboutAllChildren_No);

    await I.waitForText(moConfig.c43OrderChildText);
    await I.click('#childOption_ccd99bd3-29b8-4df5-93d6-b0a622ce033a');
    await I.click('#childOption_cbb66702-223f-42eb-93a0-b2146bc039e0');
    await I.fillField(this.fields.recticalsOrPreambels, moConfig.preambleText);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.wait('5');

    await I.waitForText('Full name');
    await I.fillField(this.fields.guardianNameEle, 'Test guardian name');
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.previewOrderText);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.cyaText);
    await I.click(moConfig.submitText);
    await I.waitForElement(this.fields.successElement);
  },

  async editOrderTask() {
    await I.wait(longWait);
    await I.click(this.fields.returnToTaskTab);

    await I.wait(medWait);
    await I.reloadPage(this.fields.assignToMe);
    await I.waitForElement(this.fields.assignToMe);
    await I.click(this.fields.assignToMe);

    await I.waitForElement(this.fields.issueTaskName, medWait);
    await I.reloadPage(this.fields.issueTaskName);
    await I.waitForElement(this.fields.issueTaskName);
    await I.click(this.fields.issueTaskName);

    await I.waitForText(moConfig.selectEditOrderText, longWait);
  },

  async selectEditDraftOrderCourtAdmin(modeOfOrder) {
    await I.triggerEvent(modeOfOrder);
    // await this.editOrderTask();
    await I.waitForText(moConfig.selectEditOrderText, longWait);
    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectDraftOrderForEditing, option);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.waitForElement(this.fields.editOrderMyselfCourtAdmin);
    await I.click(this.fields.editOrderMyselfCourtAdmin);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.waitForText(moConfig.orderConsentText, longWait);
    await I.click(this.fields.judgeTitle_DistrictJudge);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.specialGuardingText, longWait);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.previewOrderText, longWait);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
  },

  async selectEditDraftOrderSolicitor(modeOfOrder) {
    await I.triggerEvent(modeOfOrder);
    await this.editOrderTask();
    await I.waitForText(moConfig.selectEditOrderText, longWait);
    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectDraftOrderForEditing, option);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await I.wait(shortWait);
    await I.click(this.fields.editOrderMyselfSolicitor);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.waitForText(moConfig.orderConsentText, longWait);
    await I.click(this.fields.judgeTitle_DistrictJudge);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await I.wait(shortWait);
    await I.waitForText(moConfig.specialGuardingText, longWait);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.previewOrderText, longWait);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
  },

  async selectEditServeOrder(modeOfOrder) {
    await I.triggerEvent(modeOfOrder);
    await I.waitForText(moConfig.selectEditOrderText, longWait);
    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectDraftOrderForEditing, option);
    await I.click(moConfig.continueText);

    await I.wait(shortWait);
    await I.click(this.fields.editOrder_no);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
  },

  async performServeOrder() {
    await I.waitForText(moConfig.orderTypeQuestionText, longWait);
    await I.selectOption(this.fields.selectOrderType, moConfig.orderTypeText);
    await I.click(this.fields.cafcassOrCymruNeedToProvideReport_Yes);
    await I.waitForText('Section 7 report', longWait);
    await I.click(this.fields.cafcassDocSelection);
    await I.fillField(this.fields.reportFillDay, '20');
    await I.fillField(this.fields.reportFillMonth, '3');
    await I.fillField(this.fields.reportFillYear, '2024');
    await I.click(this.fields.orderEndsInvolvementOfCafcassOrCymru_No);
    await I.click(this.fields.doYouWantToServeOrder_Yes);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await I.waitForElement(this.fields.selectOrderToServe);
    await I.click(this.fields.selectOrderToServe);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.serveOrdersText, longWait);
    await I.click('[name="serveOrderDynamicList"]');
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.wait(shortWait);

    await I.waitForText(moConfig.servingToRespondentText, longWait);
    await I.click(this.fields.servePersonallyOptions_Yes);
    await I.click(this.fields.servingRespondentsOptionsCA_applicantLegalRepresentative);
    await I.click(this.fields.cafcassCymruServedOptions_Yes);
    await I.click(this.fields.addOtherOrg);
    await I.click('Add new');
    await I.wait('5');
    await I.click(this.fields.deliverByEmail);
    await I.click(this.fields.deliverByEmail);
    await I.wait('5');
    await I.fillField(this.fields.emailName, moConfig.emailName);
    await I.fillField(this.fields.emailAddress, 'test@gov.uk');
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await I.wait(shortWait);
    await I.waitForText(moConfig.cyaText, longWait);
    await I.runAccessibilityTest();
    await I.click(moConfig.submitText);
    await I.waitForElement(this.fields.successElement);
  },

  async verifyOrderSubmission() {
    await I.clickTillElementFound(this.fields.ordersTabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.ordersTabSelector);

    await I.waitForText(moConfig.c43AOrderText, longWait);
    await I.runAccessibilityTest();
    await I.waitForText(moConfig.directionsText, longWait);
    await I.waitForText(moConfig.judgeNameText, longWait);
    await I.waitForText(moConfig.orderCreatedUserBySolicitorText, longWait);
    await I.waitForText(moConfig.expChildrenText, longWait);
    await I.waitForText(moConfig.orderTypeText, longWait);
    await I.waitForText('Legal Solicitor (Applicant\'s legal representative)', longWait);
    await I.waitForText(moConfig.emailName, longWait);
  },

  async verifyCourtAdminOrderSubmission() {
    await I.clickTillElementFound(this.fields.ordersTabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.ordersTabSelector);

    await I.waitForText(moConfig.c43AOrderText, longWait);
    await I.runAccessibilityTest();
    await I.waitForText(moConfig.judgeNameText, longWait);
    await I.waitForText(moConfig.orderCreatedUserByAdminText, longWait);
    await I.waitForText(moConfig.expChildrenText, longWait);
    await I.waitForText(moConfig.orderTypeText, longWait);
    await I.waitForText('Legal Solicitor (Applicant\'s legal representative)', longWait);
    await I.waitForText(moConfig.emailName, longWait);
  },

  async sendToAdmin() {
    await I.waitForText(moConfig.directionsToAdminText, longWait);
    await I.fillField(this.fields.judgeDirectionsToAdmin, moConfig.directionsText);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.cyaText, longWait);
    await I.click(moConfig.submitText);
    await I.wait('10');
    await I.waitForText('Order approved', longWait);
    await I.click(moConfig.returnToCaseDetails);
  },

  async verifyDraftOrderSubmission(orderCreatedUserByText) {
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.tabSelector);

    await I.waitForText(moConfig.c43AOrderText, longWait);
    await I.runAccessibilityTest();
    await I.waitForText(moConfig.directionsText, longWait);
    await I.waitForText(moConfig.judgeNameText, longWait);
    await I.waitForText(orderCreatedUserByText, longWait);
    await I.waitForText(moConfig.reviewedByText, longWait);
  },

  async selectTypeOfOrderForUpload(orderName) {
    await I.retry(retryCount).waitForText('Upload an order');
    await I.retry(retryCount).waitForText('Select an order');
    await I.retry(retryCount).click(orderName);
    await I.retry(retryCount).click(this.fields.isTheOrderUploadedByConsent_Yes);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },
  async uploadOrder() {
    await I.retry(retryCount).waitForText('Approval Date (Optional)');
    await I.click(this.fields.orderApprovedAtHearing_No);
    await I.retry(retryCount).fillField(this.fields.dateOrderMade_day, '11');

    await I.retry(retryCount).fillField(this.fields.dateOrderMade_month, '11');

    await I.retry(retryCount).fillField(this.fields.dateOrderMade_year, '2022');

    await I.retry(retryCount).click(this.fields.OrderAboutAllChildren_Yes);
    await I.retry(retryCount).attachFile(this.fields.uploadOrderDoc, '../resource/dummy.pdf');
    await I.wait('6');
    await I.runAccessibilityTest();
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
      await I.retry(retryCount).selectOption(this.fields.legalAdviserListToReviewOrder, 'Legal ops(prl_legalops11_swansea@justice.gov.uk)');
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
    await I.runAccessibilityTest();
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
    await I.retry(retryCount).continueEvent();
  },
  async servePersonalOrNonPersonal(personal, responsible) {
    if (personal === 'Yes') {
      await I.retry(retryCount).click(this.fields.servePersonallyOptions_Yes);
      await I.retry(retryCount).click(responsible);
    }
    // await I.retry(retryCount).click(this.fields.otherPartiesToServe);
    await I.retry(retryCount).click(this.fields.cafcassCymruServedOptions_No);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },
  async checkYourAnswersAndSubmit() {
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Submit');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  },
  async createAnOrderC21() {
    await this.selectOrder('Create an order');
    await I.waitForElement('#createSelectOrderOptions-blankOrderOrDirections');
    await I.retry(retryCount).click('Blank order or directions (C21)');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.waitForElement('#c21OrderOptions-c21other');
    await I.retry(retryCount).click('Blank order or directions (C21): Other');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
    await this.fillGenericScreen();
    await I.retry(retryCount).fillField(this.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).fillField(this.fields.orderDirections, 'TEST ORDER DIRECTIONS');
    await I.runAccessibilityTest();
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
    await I.retry(retryCount).click(this.fields.OrderAboutAllChildren_Yes);
  },
  async submitManageOrder() {
    await I.retry(retryCount).continueEvent();
    await I.waitForElement('#amendOrderSelectCheckOptions-judgeOrLegalAdvisorCheck');
    await I.retry(retryCount).click('#amendOrderSelectCheckOptions-managerCheck');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).click('Submit');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await I.wait('4');
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.retry(retryCount).click(this.fields.tabSelector);
    await I.retry(retryCount).waitForText('Blank order or directions (C21)');
  },

  async composeDraftOrder() {
    global.logCallingFunction();
    await this.selectDraftOrder(moConfig.doText);
    await this.includeOrderDetails();
  },

  async editDraftOrderCreatedByAdmin() {
    await this.selectEditDraftOrderCourtAdmin(moConfig.editOrderText);
    await this.sendToAdmin();
    await this.verifyDraftOrderSubmission(moConfig.orderCreatedUserByAdminText);
  },

  async editAnDraftOrderCreatedBySolicitor() {
    await this.selectEditDraftOrderSolicitor(moConfig.editOrderText);
    await this.sendToAdmin();
    await this.verifyDraftOrderSubmission(moConfig.orderCreatedUserBySolicitorText);
  },

  async serveDraftOrderByCourtAdmin() {
    await this.selectEditServeOrder(moConfig.editAndServeOrderText);
    await this.performServeOrder();
    await this.verifyOrderSubmission();
  },

  async createAndServeOrderByCourtAdmin() {
    await this.selectEditServeOrder(moConfig.editAndServeOrderText);
    await this.performServeOrder();
    await this.verifyCourtAdminOrderSubmission();
  },

  async includeGuardianAndJudgeDetails() {
    await I.waitForText(moConfig.specialGuardianQuestion, longWait);
    await I.fillField(this.fields.guardianInputBox, moConfig.guardianName);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.waitForText(moConfig.previewOrderText, longWait);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.reviewOrderQuestion, longWait);
    await I.click(this.fields.judgeCheckOrderEle);
    await I.waitForText(moConfig.selectJudiciaryQuestion, longWait);
    await I.click(this.fields.selectJudgeForOrderReview);
    await I.fillField(this.fields.judgeNameField, 'yolanda');
    await I.waitForElement(this.fields.judgeAutoCompEle);
    await I.wait(medWait);
    await I.click(this.fields.judgeAutoCompEle);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
  },

  async includeGuardianAndCaseManagerDetails() {
    await I.waitForText(moConfig.specialGuardianQuestion, longWait);
    await I.fillField(this.fields.guardianInputBox, moConfig.guardianName);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
    await I.waitForText(moConfig.previewOrderText, longWait);
    await I.click(moConfig.continueText);

    await I.waitForText(moConfig.reviewOrderQuestion, longWait);
    await I.click(this.fields.caseManagerCheckOrderEle);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);
  },

  async includeAdminOrderDetails() {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    await I.waitForText(moConfig.c43AOrderText, longWait);
    await I.waitForElement(this.fields.orderByConsent_Yes);
    await I.click(this.fields.orderByConsent_Yes);
    await I.click(this.fields.orderApprovedAtHearing_No);
    await I.click(this.fields.judgeTitle_HerHonourJudge);
    await I.fillField(this.fields.judgeLastName, moConfig.judgeNameText);
    await I.fillField(this.fields.legalAdviserFullName, moConfig.legalAdvisorNameText);
    await I.fillField(this.fields.orderMade_day, day);
    await I.fillField(this.fields.orderMade_month, month);
    await I.fillField(this.fields.orderMade_year, year);
    await I.click(this.fields.orderAboutAllChildren_No);

    await I.waitForText(moConfig.c43OrderChildText, longWait);
    await I.click('#childOption_ccd99bd3-29b8-4df5-93d6-b0a622ce033a');
    await I.click('#childOption_cbb66702-223f-42eb-93a0-b2146bc039e0');
    await I.fillField(this.fields.recticalsOrPreambels, moConfig.preambleText);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await this.includeGuardianAndJudgeDetails();
    await I.waitForText(moConfig.cyaText, longWait);
    await I.click(moConfig.submitText);
    await I.waitForElement(this.fields.successElement);
  },

  async includeAdminOrderDetailsToBeReviewedByCM() {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    await I.waitForText(moConfig.c43AOrderText, longWait);
    await I.waitForElement(this.fields.orderByConsent_Yes);
    await I.click(this.fields.orderByConsent_Yes);
    await I.click(this.fields.orderApprovedAtHearing_No);
    await I.click(this.fields.judgeTitle_HerHonourJudge);
    await I.fillField(this.fields.judgeLastName, moConfig.judgeNameText);
    await I.fillField(this.fields.legalAdviserFullName, moConfig.legalAdvisorNameText);
    await I.fillField(this.fields.orderMade_day, day);
    await I.fillField(this.fields.orderMade_month, month);
    await I.fillField(this.fields.orderMade_year, year);
    await I.click(this.fields.orderAboutAllChildren_No);

    await I.waitForText(moConfig.c43OrderChildText, longWait);
    await I.click('#childOption_ccd99bd3-29b8-4df5-93d6-b0a622ce033a');
    await I.click('#childOption_cbb66702-223f-42eb-93a0-b2146bc039e0');
    await I.fillField(this.fields.recticalsOrPreambels, moConfig.preambleText);
    await I.runAccessibilityTest();
    await I.click(moConfig.continueText);

    await this.includeGuardianAndCaseManagerDetails();
    await I.waitForText(moConfig.cyaText, longWait);
    await I.click(moConfig.submitText);
    await I.waitForElement(this.fields.successElement);
  },

  async verifyAdminDraftOrderSubmission() {
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.tabSelector);

    await I.waitForText(moConfig.c43AOrderText, longWait);
    await I.runAccessibilityTest();
    await I.waitForText(moConfig.judgeNameText, longWait);
    await I.waitForText(moConfig.orderCreatedByText, longWait);
  },

  async createAnOrderC43() {
    await this.selectOrder('Create an order');
    await I.click(this.fields.selectC43AOrder);
    await I.click(moConfig.continueText);
    await this.includeAdminOrderDetails();
    await this.verifyAdminDraftOrderSubmission();
  },

  async createOrderC43AndSendToCaseManager() {
    await this.selectOrder('Create an order');
    await I.click(this.fields.selectC43AOrder);
    await I.click(moConfig.continueText);
    await this.includeAdminOrderDetailsToBeReviewedByCM();
  }
};
