'use strict';

const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const PeopleInTheCasePage = require('./pages/PeopleInTheCase');
const UploadDocuments = require('./pages/UploadDocuments');
const UploadFLDocuments = require('./pages/UploadFLDocuments');
const TypeOfApplicationEvent = require('./pages/TypeOfApplication');
const AttendingTheHearing = require('./pages/AttendingTheHearing');
const Miam = require('./pages/Miam.js');
const ChildDetails = require('./pages/ChildDetails');
const ApplicantDetails = require('./pages/ApplicantDetails');
const CaseName = require('./pages/CaseName');
const HearingUrgency = require('./pages/HearingUrgency');
const LitigationCapacity = require('./pages/LitigationCapacity');
const OtherPeopleInTheCase = require('./pages/OtherPeopleInTheCase');
const InternationalElement = require('./pages/InternationalElement');
const RespondentDetails = require('./pages/RespondentDetails');
const WelshLanguage = require('./pages/WelshLanguage');
const otherProceedings = require('./pages/OtherProceedings');
const allegationsOfHarm = require('./pages/allegationsOfHarm');
const viewPDFApplication = require('./pages/ViewPDFApplication');
const statementOfTruth = require('./pages/StatementOfTruth');
const manageDocuments = require('./pages/ManageDocumentsScreens/ManageDocuments');
const respondentBehaviour = require('./pages/DOScreens/RespondentBehaviour');
const relationshipToRespondent = require('./pages/DOScreens/RelationshipToRespondent');
const DOAttendingTheHearing = require('./pages/DOScreens/AttendingTheHearing');
const applicantsFamily = require('./pages/DOScreens/ApplicantsFamily');
const withOutNoticeOrder = require('./pages/DOScreens/DaWithoutNoticeOrder');
const theHome = require('./pages/DOScreens/TheHome');
const submitAndPay = require('./pages/SubmitAndPay');
const caseList = require('./pages/CaseList');
const manageOrders = require('./pages/MOScreens/ManageOrders');
const manageOrderHearing = require('./pages/ManageOrderHearing');
const OtherChildrenNotInCase = require('./pages/OtherChildrenNotInCase');
const ChildrenRelationships = require('./pages/ChildrenRelationships');
const editAndApproveDraftOrder = require('./pages/EditAndApproveDraftOrder');
const UploadAdditionalApplications = require('./pages/UploadAdditionalApplications');
const solicitorWithdrawApplication = require('./pages/WithdrawApplication');
const solicitorDraftOrder = require('./pages/SolicitorDraftOrder');
const moveCaseToGateKeeping = require('./pages/MoveCaseToGateKeeping');
const issueCasePage = require('./pages/IssueCase');
const solicitorReasonableAdjustment = require('./pages/SolicitorReasonableAdjustment');
const hearingRequestPage = require('./pages/HearingRequest');
const amendCaseDetailsPage = require('./pages/AmendCaseDetails');
const nocDetailsPage = require('./pages/NOCScreens/NocDetails');
const sendMessagePage = require('./pages/SendMsgScreens/SendMsg');
const soaPage = require('./pages/SOAScreens/ServiceOfApplication');
const ManageDocuments = require('./pages/ManageDocumentsScreens/ManageDocuments');
const reqSupport = require('./pages/ReqSupportScreens/reqSupport');
const manageFlags = require('./pages/ManageFlagsScreens/manageFlags');
const createFlags = require('./pages/CreateFlagScreens/createFlags');
const verifyFlags = require('./pages/CreateFlagScreens/verifySolicitorFlags');
// const { ordersApplyingForPageFL401 } = require('./pages/TypeOfApplication');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    loginAsRespondentSolicitor() {
      return LoginPage.loginAsRespondentSolicitor();
    },
    loginAsCourtAdmin() {
      return LoginPage.loginAsCourtAdmin();
    },
    loginAsJudge() {
      return LoginPage.loginAsJudge();
    },
    loginAsSwanseaCourtAdmin() {
      return LoginPage.loginAsSwanseaCourtAdmin();
    },
    selectOrderForReview() {
      return editAndApproveDraftOrder.selectOrderForJudgeReview();
    },
    runAttendingTheHearingEvent() {
      return AttendingTheHearing.runEventHappyPathAttendingTheHearing();
    },
    runPeopleInTheCaseEvent() {
      return PeopleInTheCasePage.runEventHappyPath();
    },
    createCase() {
      return CreateCasePage.createNewCaseC100();
    },
    createCase_TS() {
      return CreateCasePage.createNewCaseC100_TS();
    },
    createNewCaseFL401_TS() {
      return CreateCasePage.createNewCaseFL401_TS();
    },
    createC100CaseByCourtAdmin() {
      return CreateCasePage.createC100CaseByCourtAdmin();
    },
    createFL401CaseByCourtAdmin() {
      return CreateCasePage.createFL401CaseByCourtAdmin();
    },
    manageOrderCreateOrderC21() {
      return manageOrders.createAnOrderC21();
    },
    submitManageOrder() {
      return manageOrders.submitManageOrder();
    },
    manageOrderUploadOrderServeNowPersonally() {
      return manageOrders.manageOrderUploadOrderServeNowPersonally();
    },
    manageOrderUploadOrderForJudgeReview() {
      return manageOrders.manageOrderUploadOrderForJudgeReview();
    },
    fillHearingDetails() {
      return manageOrderHearing.fillHearingDetails();
    },
    createCaseFL401() {
      return CreateCasePage.createNewCaseFL401();
    },
    createCaseAndReturnID() {
      return CreateCasePage.createNewCaseC100andReturnID();
    },
    uploadDocuments() {
      return UploadDocuments.uploadDocuments();
    },
    uploadFLDocuments() {
      return UploadFLDocuments.uploadFLDocuments();
    },
    typeOfApplicationEventC100() {
      return TypeOfApplicationEvent.typeOfApplicationEventC100();
    },
    typeOfApplicationEventFL401() {
      return TypeOfApplicationEvent.typeOfApplicationEventFL401();
    },
    runMIAMEventHappyPath() {
      return Miam.runMIAMEventHappyPath();
    },
    childDetails() {
      return ChildDetails.runChildDetailsEventHappyPath();
    },
    runOtherChildDetailsEvent() {
      return OtherChildrenNotInCase.runOtherChildDetailsEvent();
    },
    runChildrenAndApplicant() {
      return ChildrenRelationships.runChildrenAndApplicant();
    },
    runChildrenAndRespondent() {
      return ChildrenRelationships.runChildrenAndRespondent();
    },
    runChildrenAndOtherPeople() {
      return ChildrenRelationships.runChildrenAndOtherPeople();
    },
    applicantDetailsC100() {
      return ApplicantDetails.runApplicantDetailsEventHappyPath();
    },
    applicantDetailsFL401() {
      return ApplicantDetails.runApplicantDetailsFL401EventHappyPath();
    },
    caseNameChange() {
      return CaseName.runEventCaseName();
    },
    hearingUrgency() {
      return HearingUrgency.hearingUrgency();
    },
    litigationCapacity() {
      return LitigationCapacity.litigationCapacity();
    },
    otherPeopleInTheCase() {
      return OtherPeopleInTheCase.otherPeopleInTheCase();
    },
    internationalElement() {
      return InternationalElement.internationalElement();
    },
    respondentDetailsC100() {
      return RespondentDetails.respondentDetailsC100();
    },
    respondentDetailsFL401() {
      return RespondentDetails.respondentDetailsFL401();
    },
    welshLanguageRequirement() {
      return WelshLanguage.welshLanguageRequirement();
    },
    otherProceedingsEventC100() {
      return otherProceedings.otherProceedingsEventC100();
    },
    otherProceedingsEventFL401() {
      return otherProceedings.otherProceedingsEventFL401();
    },
    allegationsOfHarmEvent() {
      return allegationsOfHarm.allegationsOfHarmEvent();
    },
    viewPDFApplicationEvent() {
      return viewPDFApplication.runViewPDFApplicationEvent();
    },
    statementOfTruthEvent() {
      return statementOfTruth.runStatementOfTruthEvent();
    },
    runRespondentBehaviour() {
      return respondentBehaviour.runEventRespondentBehaviour();
    },
    runRelationshipToRespondent() {
      return relationshipToRespondent.runEventrelationshipToRespondent();
    },
    runDOAttendingTheHearingEvent() {
      return DOAttendingTheHearing.runEventHappyPathAttendingTheHearingDO();
    },
    runApplicantsFamilyEvent() {
      return applicantsFamily.runEventApplicantsFamily();
    },
    runWithoutNoticeOrderHappyPath() {
      return withOutNoticeOrder.fillDetailsWithoutNoticeOrderHappyPath();
    },
    runTheHomeHappyPath() {
      return theHome.runTheHomeEventHappyPath();
    },
    runSubmitAndPayHappyPath() {
      return submitAndPay.submitAndPay();
    },
    statementOfTruthAndSubmit() {
      return submitAndPay.statementOfTruthAndSubmit();
    },
    solicitorDraftAnOrderPowerOfArrestFL406() {
      return solicitorDraftOrder.solicitorDraftAnOrderPowerOfArrestFL406();
    },
    solicitorDraftAnOrderBlankOrderFL404B() {
      return solicitorDraftOrder.solicitorDraftAnOrderBlankOrderFL404B();
    },
    runSubmitAndPayHappyPath_HWF_Yes() {
      return submitAndPay.submitAndPay_HWF_Yes();
    },
    runSubmitAndPay_TS() {
      return submitAndPay.dummyPaymentConfirmation();
    },
    searchForCasesWithName(caseName) {
      return caseList.searchForCasesWithName(caseName, 'Open');
    },
    navigateToCaseList() {
      return caseList.navigate();
    },
    seeCaseInSearchResult(caseID) {
      return caseList.seeCaseInSearchResult(caseID);
    },
    issueAndSendToLocalCourt() {
      return caseList.issueAndSendToLocalCourt();
    },
    selectApplication() {
      return UploadAdditionalApplications.selectApplication();
    },
    uploadApplication() {
      return UploadAdditionalApplications.uploadApplication();
    },
    awpCAOtherOrders() {
      return UploadAdditionalApplications.awpCAOtherOrders();
    },
    createSolicitorDummyCase() {
      return CreateCasePage.createNewSolicitorDummyC100Case();
    },
    payAndSubmitDummySolicitorCase() {
      return submitAndPay.submitAndPayForDummySolicitorApplication();
    },
    solicitorWithdrawApplication() {
      return solicitorWithdrawApplication.solicitorWithdrawApplicationFlow();
    },
    saveTheCaseIdAndSignout() {
      return CreateCasePage.saveTheCaseIdAndSignout();
    },
    saveTheCaseId() {
      return CreateCasePage.saveTheCaseId();
    },
    logInAsSolicitorNoCookies() {
      return LoginPage.loginAsSolicitorNoCookiesDisplayed();
    },
    searchForCaseAndOpenCase() {
      return caseList.searchForCaseAndOpenCase();
    },
    searchForCasesWithId(caseId) {
      return caseList.searchForCasesWithId(caseId, 'Any');
    },
    searchForCaseWithoutId() {
      return caseList.searchForCaseWithoutId();
    },
    verifySearchResultsFilteredByState() {
      return caseList.verifySearchResultsFilteredByState();
    },
    issueCase() {
      return issueCasePage.issueCase();
    },
    moveCaseToGateKeeping() {
      return moveCaseToGateKeeping.moveCaseToGateKeeping();
    },
    raiseSupportRequestForDocInAlternateType() {
      return solicitorReasonableAdjustment.raiseSupportRequestForDocInAlternateType();
    },
    raiseSupportRequestForDocInAlternateTypeDA() {
      return solicitorReasonableAdjustment.raiseSupportRequestForDocInAlternateTypeDA();
    },
    raiseSupportRequestForOtherType() {
      return solicitorReasonableAdjustment.raiseSupportRequestForOtherType();
    },
    raiseSupportRequestForGetIntoInandAroundBuilding() {
      return solicitorReasonableAdjustment.raiseSupportRequestForGetIntoInandAroundBuilding();
    },
    requestANewHearing() {
      return hearingRequestPage.submitHearing();
    },
    updateAHearing() {
      return hearingRequestPage.updateHearing();
    },
    cancelHearing() {
      return hearingRequestPage.cancelHearing();
    },
    draftAnOrder() {
      return manageOrders.composeDraftOrder();
    },
    editAnDraftOrderCreatedBySolicitor() {
      return manageOrders.editAnDraftOrderCreatedBySolicitor();
    },
    editAnDraftOrderCreatedByAdmin() {
      return manageOrders.editDraftOrderCreatedByAdmin();
    },
    serveAnOrder() {
      return manageOrders.serveDraftOrderByCourtAdmin();
    },
    adminServeAnOrder() {
      return manageOrders.createAndServeOrderByCourtAdmin();
    },
    manageOrderCreateOrderC43() {
      return manageOrders.createAnOrderC43();
    },
    searchForInvalidCase() {
      return caseList.searchForInvalidCase();
    },
    verifyInvalidSearchResults() {
      return caseList.verifyInvalidSearchResults();
    },
    additionFilteringByApplicationType() {
      return caseList.additionFilteringByApplicationType();
    },
    verifySearchResultsFilteredByStateAndApplicationType() {
      return caseList.verifySearchResultsFilteredByStateAndApplicationType();
    },
    amendMiamDetails() {
      return amendCaseDetailsPage.updateApplicantMIAMInfo();
    },
    verifyUpdatedMiamDetails() {
      return amendCaseDetailsPage.verifyUpdatedMiamDetails();
    },
    amendDARespondentDetails() {
      return amendCaseDetailsPage.updateDARespondentDetails();
    },
    verifyUpdatedRespondentDetails() {
      return amendCaseDetailsPage.verifyUpdatedRespondentDetails();
    },
    submitAndVerifyNOCForCaseWithId(caseId) {
      return nocDetailsPage.triggerAndVerifyNocChanges(caseId);
    },
    sendAMessage() {
      return sendMessagePage.sendInternalMsgToJudge();
    },
    reviewTheMessage() {
      return sendMessagePage.reviewMessageAsJudge();
    },
    replyToMessageAsJudge() {
      return sendMessagePage.respondToMessageAsJudge();
    },
    performServiceOfApplication() {
      return soaPage.performServiceOfApplication();
    },
    performManageDocuments() {
      return manageDocuments.runManageDocumentsHappyPath();
    },
    reviewManageDocuments() {
      return manageDocuments.reviewDocuments();
    },
    performNonRestrictedManageDocuments() {
      return ManageDocuments.addNonRestrictedDocuments();
    },
    reviewNonRestManageDocuments() {
      return manageDocuments.nonRestReviewDocuments();
    },
    requestSupportForHearing() {
      return reqSupport.requestSupportForParties();
    },
    reviewSupportForHearingRequest() {
      return manageFlags.reviewSupportRequestForParties();
    },
    addCAFlags() {
      return createFlags.createFlags();
    },
    reviewCAAddedFlags() {
      return verifyFlags.verifySolicitorOnlyFlags();
    }
  });
};
