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
const otherProceedings = require('./pages/otherProceedings');
const allegationsOfHarm = require('./pages/allegationsOfHarm');
const viewPDFApplication = require('./pages/ViewPDFApplication');
const manageDocuments = require('./pages/ManageDocuments');
const respondentBehaviour = require('./pages/DOScreens/RespondentBehaviour');

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
    uploadDocuments() {
      return UploadDocuments.uploadDocuments();
    },
    typeOfApplicationEvent() {
      return TypeOfApplicationEvent.typeOfApplicationEvent();
    },
    runMIAMEventHappyPath() {
      return Miam.runMIAMEventHappyPath();
    },
    childDetails() {
      return ChildDetails.runChildDetailsEventHappyPath();
    },
    applicantDetails() {
      return ApplicantDetails.runApplicantDetailsEventHappyPath();
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
    respondentDetails() {
      return RespondentDetails.respondentDetails();
    },
    welshLanguageRequirement() {
      return WelshLanguage.welshLanguageRequirement();
    },
    otherProceedingsEvent() {
      return otherProceedings.otherProceedingsEvent();
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
    }
  });
};
