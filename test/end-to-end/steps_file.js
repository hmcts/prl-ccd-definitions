const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const PeopleInTheCasePage = require('./pages/PeopleInTheCase');
const UploadDocuments = require('./pages/UploadDocuments');
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
const manageDocuments = require('./pages/ManageDocuments');
const respondentBehaviour = require('./pages/DOScreens/RespondentBehaviour');
const relationshipToRespondent = require('./pages/DOScreens/RelationshipToRespondent');
const DOAttendingTheHearing = require('./pages/DOScreens/AttendingTheHearing');
const applicantsFamily = require('./pages/DOScreens/ApplicantsFamily');
const withOutNoticeOrder = require('./pages/DOScreens/DaWithoutNoticeOrder');
const theHome = require('./pages/DOScreens/TheHome');
const submitAndPay = require('./pages/SubmitAndPay');
const caseList = require('./pages/CaseList');
const manageOrders = require('./pages/ManageOrders');
const manageOrderHearing = require('./pages/ManageOrderHearing');
const OtherChildrenNotInCase = require('./pages/OtherChildrenNotInCase');
const ChildrenRelationships = require('./pages/ChildrenRelationships');
const editAndApproveDraftOrder = require('./pages/EditAndApproveDraftOrder');
const UploadAdditionalApplications = require('./pages/UploadAdditionalApplications');
const solicitorWithdrawApplication = require('./pages/WithdrawApplication');
const moveCaseToGateKeeping = require('./pages/MoveCaseToGateKeeping');
const issueCasePage = require('./pages/IssueCase');
const solicitorReasonableAdjustment = require('./pages/SolicitorReasonableAdjustment')


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
    createNewSolicitorDummyFL401Case() {
      return CreateCasePage.createNewSolicitorDummyFL401Case();
    },
    createC100CaseByCourtAdmin() {
      return CreateCasePage.createC100CaseByCourtAdmin();
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
    logInAsSolicitorNoCookies() {
      return LoginPage.loginAsSolicitorNoCookiesDisplayed();
    },
    searchForCaseAndOpenCase() {
      return caseList.searchForCaseAndOpenCase();
    },
    searchForCasesWithId(caseId) {
      return caseList.searchForCasesWithId(caseId, 'Any');
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
    }
  });
};
