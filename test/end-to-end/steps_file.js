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
const generalHelper = require('./helpers/generalHelper');
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
const ChildrenAndApplicants = require('./pages/ChildrenAndApplicants');
const ChildrenAndRespondents = require('./pages/ChildrenAndRespondents');
const OtherChildNotInCase = require('./pages/OtherChildNotInCase');
const ChildrenAndOtherPeople = require('./pages/ChildrenAndOtherPeople');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    runAttendingTheHearingEvent() {
      return AttendingTheHearing.runEventHappyPathAttendingTheHearing();
    },
    runPeopleInTheCaseEvent() {
      return PeopleInTheCasePage.runEventHappyPath();
    },
    triggerEvent(eventName) {
      return generalHelper.triggerEvent(eventName);
    },
    createCase() {
      return CreateCasePage.createNewCaseC100();
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
    applicantDetailsC100() {
      return ApplicantDetails.runApplicantDetailsEventHappyPath();
    },
    applicantDetailsFL401() {
      return ApplicantDetails.runApplicantDetailsFL401EventHappyPath();
    },
    runChildrenAndApplicantRelationship(){
      return ChildrenAndApplicants.runChildrenAndApplicantRelationship();
    },
    runChildrenAndRespondentRelationship() {
      return ChildrenAndRespondents.runChildrenAndRespondentRelationship();
    },
    runChildrenAndOtherPeopleRelationship() {
      return ChildrenAndOtherPeople.runChildrenAndOtherPeopleRelationship();
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
    runOtherPeopleInTheCase() {
      return OtherPeopleInTheCase.runOtherPeopleInTheCase();
    },
    runOtherChildrenNotInCase() {
      return OtherChildNotInCase.runOtherChildrenNotInCase();
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
    searchForCasesWithName(caseName) {
      return caseList.searchForCasesWithName(caseName, 'Open');
    },
    navigateToCaseList() {
      return caseList.navigate();
    },
    seeCaseInSearchResult(caseID) {
      return caseList.seeCaseInSearchResult(caseID);
    },
    amOnHistoryPageWithSuccessNotification() {
      return generalHelper.amOnHistoryPageWithSuccessNotification();
    }
  });
};
