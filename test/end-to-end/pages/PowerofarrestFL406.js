const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    powerOfArrestPageTitle: 'Power of arrest (FL406)',
    caseNumber: '#fl404CustomFields_fl404bCaseNumber',
    applicantName: '#fl404CustomFields_fl404bApplicantName',
    applicantReference: '#fl404CustomFields_fl404bApplicantReference',
    respondentName: '#fl404CustomFields_fl404bRespondentName',
    respondentReference: '#fl404CustomFields_fl404bRespondentReference',
    respondentDOBDay: '#fl404bRespondentDob-day',
    respondentDOBMonth: '#fl404bRespondentDob-month',
    respondentDOBYear: '#fl404bRespondentDob-year',
    powerOfArrestParagraph: '#fl404CustomFields_fl404bPowerOfArrestParagraph',
    harmToApplicantYes: '#fl404CustomFields_fl404bRiskOfSignificantHarm_Yes',
    harmToApplicantNo: '#fl404CustomFields_fl404bRiskOfSignificantHarm_No',
    dateOrderMadeDay: '#fl404bDateOrderMade-day',
    dateOrderMadeMonth: '#fl404bDateOrderMade-month',
    dateOrderMadeYear: '#fl404bDateOrderMade-year',
    dateOrderEndDay: '#fl404bDateOrderEnd-day',
    dateOrderEndMonth: '#fl404bDateOrderEnd-month',
    dateOrderEndYear: '#fl404bDateOrderEnd-year',
    dateOrderEndTime: '#fl404CustomFields_fl404bDateOrderEndTime'
  },
  async fillPowerOfArrestOrderScreen() {
    await I.retry(retryCount).fillField(this.fields.caseNumber, '1234567890123456');
    await I.retry(retryCount).fillField(this.fields.applicantName, 'APPLICANT FULL NAME');
    await I.retry(retryCount).fillField(this.fields.applicantReference, 'APPLICANT REFERENCE');
    await I.retry(retryCount).fillField(this.fields.respondentName, 'RESPONDENT NAME');
    await I.retry(retryCount).fillField(this.fields.respondentReference, 'RESPONDENT REFERENCE');
    await I.retry(retryCount).fillField(this.fields.respondentDOBDay, '12');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.respondentDOBMonth, '12');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.respondentDOBYear, '1979');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.powerOfArrestParagraph, 'PARAGRAPH OF THE ORDER');
    await I.retry(retryCount).click(this.fields.harmToApplicantYes);
    await I.retry(retryCount).fillField(this.fields.dateOrderMadeDay, '11');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.dateOrderMadeMonth, '11');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.dateOrderMadeYear, '2022');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.dateOrderEndDay, '30');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.dateOrderEndMonth, '11');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.dateOrderEndYear, '2022');
    await I.wait('1');
    await I.retry(retryCount).fillField(this.fields.dateOrderEndTime, '11 AM');
    await I.wait('1');
    await I.retry(retryCount).continueEvent();
    await I.wait('9');
  }

};