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
const manageDocuments = require('./pages/ManageDocuments');
const respondentBehaviour = require('./pages/DOScreens/RespondentBehaviour');
const relationshipToRespondent = require('./pages/DOScreens/RelationshipToRespondent');
const DOAttendingTheHearing = require('./pages/DOScreens/AttendingTheHearing');
const applicantsFamily = require('./pages/DOScreens/ApplicantsFamily');
const withOutNoticeOrder = require('./pages/DOScreens/DaWithoutNoticeOrder');
const theHome = require('./pages/DOScreens/TheHome');
const submitAndPay = require('./pages/SubmitAndPay');
const caseList = require('./pages/CaseList');
const manageOrders = require('./pages/Manageorders/ManageOrders');
const manageOrderHearing = require('./pages/ManageOrderHearing');
const OtherChildrenNotInCase = require('./pages/OtherChildrenNotInCase');
const ChildrenRelationships = require('./pages/ChildrenRelationships');
const editAndApproveDraftOrder = require('./pages/EditAndApproveDraftOrder');
const UploadAdditionalApplications = require('./pages/UploadAdditionalApplications');
const solicitorWithdrawApplication = require('./pages/WithdrawApplication');
const moveCaseToGateKeeping = require('./pages/MoveCaseToGateKeeping');
const issueCasePage = require('./pages/IssueCase');
const hearingRequestPage = require('./pages/HearingRequest');
// const { ordersApplyingForPageFL401 } = require('./pages/TypeOfApplication');


module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
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
    runManageDocuments() {
      return manageDocuments.runManageDocumentsHappyPath();
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
    editAnDraftOrder() {
      return manageOrders.editDraftOrderByJudge();
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
    }
  });
};
