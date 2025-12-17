Workflow: Solicitor - Manage order, Gatekeeping & Service of application tests
Test: As a Judge edit & change a draft order

Steps:
loginAsSolicitor
createSolicitorDummyCase
payAndSubmitDummySolicitorCase
draftAnOrder
saveTheCaseIdAndSignInAsStokeCourtAdmin
searchForCasesWithId(caseId);
issueCase
saveTheCaseIdAndSignInAsSwanseaCourtAdmin
searchForCasesWithId(caseId);
moveCaseToGateKeeping

Login as judge
Go to case 
Start event edit & change draft order


Test expects:  to see Event task page with link to return to tasks tab, however user is displayed first page event.

Whats happening: This is because task required for this event is already assigned to logged in judge user. 
Task title: Review and Approve Legal rep Order - Special guardianship order (C43A) 

Please confirm if automatic task assignemnet is recent change and expected behaviour.



Workflow: CA Manage Order Upload Order - TS Court Admin
Test: As a Case manager edit & approve a draft order

loginAsOldCourtAdmin
createC100CaseByCourtAdmin
caseId = saveTheCaseIdAndSignInAsSwanseaCourtAdmin
searchForCasesWithId(caseId);
manageOrderUploadOrderServeNowPersonally

loginAsSwanseaCourtAdmin
searchForCasesWithId(caseId);
manageOrderUploadOrderForJudgeReview

loginAsSwanseaCourtAdmin
searchForCasesWithId(caseId);
createOrderC43AndSendToCaseManager

login as case manager
go to case Tasks tab

  
Test expects:  to see Assign to me link displayed in Task for event edit & approve a draft order
Whats happening: This is because task is already assigned the user.

Please confirm if automatic task assignemnet is recent change and expected behaviour.

