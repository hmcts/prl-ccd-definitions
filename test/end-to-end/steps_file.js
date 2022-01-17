const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const ChildDetails = require('./pages/ChildDetails');

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
      return CreateCasePage.createNewCase();
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
    }
  });
};
