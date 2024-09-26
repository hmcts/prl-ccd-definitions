/* eslint-disable no-await-in-loop */
const I = actor();
const assert = require('assert');
const testLogger = require('../helpers/testLogger');

const retryCount = 3;
const eleCount = 7;


module.exports = {

  fields: {
    hearingsTab: '//div[contains(text(), "Hearings")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron',
    selectFacilities: '//input[@value="Projector"]',
    selectHearingStage: '#ABA5-FHR',
    selectAttendanceType: '//input[@value="In Person"]',
    applicantDropDown: '#partyChannel0',
    respondentDropDown: '#partyChannel1',
    noOfAttendees: '#attendance-number',
    hearingLocationEle: '//li[contains(@class, "location-selection")]',
    noSpecificJudge: '#noSpecificJudge',
    judgeTypeEle: '//input[@value="51"]',
    hearingDuration: '#durationhours',
    noSpecificDate: '#noSpecificDate',
    hearingInstructions: '#additionalInstructionsTextarea',
    viewEle: 'a[id^="link-view-or-edit"]',
    cancelEle: 'a[id^="link-cancel"]',
    cancelOption: '#withdraw',
    viewDetails: 'a[id^="link-view-details"]',
    updateJudgeType: '#judgeTypes',
    updateHearingLength: '#hearingLength',
    amendReason: '#partyreq',
    cancellationReason: '//div[5]/div[@class="govuk-summary-list__key"]',
    cancellationValue: '//div[5]/div[@class="govuk-summary-list__value"]'
  },

  async clickOnHearingsTab() {
    await I.waitForElement(this.fields.hearingsTab);
    await I.click(this.fields.hearingsTab);
    await I.clickTillElementFound(this.fields.hearingsTab, this.fields.nextBtnSelector);
    let retryCounter = 0;
    while (retryCounter < '3') {
      retryCounter += 1;
      try {
        await I.click(this.fields.hearingsTab);
        await I.waitForText('Current and upcoming');
        await I.click('Request a hearing');
        await I.waitForText('Hearing requirements');
        await I.runAccessibilityTest();
        await I.click('Continue');
        break;
      } catch (stepErr) {
        testLogger.AddMessage(`Error occured ${stepErr}`);
      }
    }
  },

  async fillAdditionalFacilities() {
    await I.waitForText('Do you require any additional facilities?');
    await I.waitForElement(this.fields.selectFacilities);
    await I.wait('3');
    await I.retry(retryCount).click(this.fields.selectFacilities);
    await I.click('Continue');
    await I.waitForText('What stage is this hearing at?');
    await I.click(this.fields.selectHearingStage);
    await I.runAccessibilityTest();
    await I.click('Continue');
  },

  async submitPaticipantAttendance() {
    await I.waitForText('Participant attendance');
    await I.click(this.fields.selectAttendanceType);
    await I.selectOption(this.fields.applicantDropDown, 'In Person');
    await I.selectOption(this.fields.respondentDropDown, 'In Person');
    await I.selectOption('#partyChannel2', 'In Person');
    await I.selectOption('#partyChannel3', 'In Person');
    await I.selectOption('#partyChannel4', 'In Person');
    await I.selectOption('#partyChannel5', 'In Person');
    await I.selectOption('#partyChannel6', 'In Person');
    await I.selectOption('#partyChannel7', 'In Person');
    await I.selectOption('#partyChannel8', 'In Person');
    await I.clearField(this.fields.noOfAttendees);
    await I.fillField(this.fields.noOfAttendees, '9');
    await I.runAccessibilityTest();
    await I.click('Continue');
  },

  async submitVenueAndJudgeDetails() {
    await I.waitForText('What are the hearing venue details?');
    await I.waitForElement(this.fields.hearingLocationEle);
    await I.seeElement(this.fields.hearingLocationEle);
    await I.click('Continue');
    await I.waitForText('Does this hearing need to be in Welsh?');
    await I.click('Continue');
    await I.waitForText('Do you want a specific judge?');
    await I.click(this.fields.noSpecificJudge);
    await I.waitForText('Select all judge types that apply');
    await I.click(this.fields.judgeTypeEle);
    await I.runAccessibilityTest();
    await I.click('Continue');
  },

  async submitDurationAndAdditionalInfo() {
    await I.waitForText('Length of hearing');
    await I.fillField(this.fields.hearingDuration, '2');
    await I.click(this.fields.noSpecificDate);
    await I.click('Continue');

    await I.waitForText('Will this hearing need to be linked to other hearings?');
    await I.click('Continue');

    await I.waitForText('Enter any additional instructions for the hearing');
    await I.fillField(this.fields.hearingInstructions, 'This is a test. Please ignore.');
    await I.runAccessibilityTest();
    await I.click('Continue');
  },

  async submitAndVerifyHearingRequest() {
    await I.waitForText('Check your answers before sending your request');
    await I.click('Submit request');
    await I.waitForText('Hearing request submitted');
    await I.see('Hearing request submitted');
    await I.runAccessibilityTest();
    await I.click('view the status of this hearing in the hearings tab');
    await I.waitForText('History');

    await I.runAccessibilityTest();

    let retryCounter = 0;
    while (retryCounter < retryCount) {
      retryCounter += 1;
      try {
        await I.waitForText('WAITING TO BE LISTED');
      } catch (tryError) {
        await I.click('//div[@class = \'mat-tab-label-content\'][contains(text()\'Case Notes\')]');
        await I.wait('2');
        await I.click('//div[@class = \'mat-tab-label-content\'][contains(text()\'Hearings\')]');
      }
    }
    await I.waitForText('WAITING TO BE LISTED');
    await I.see('WAITING TO BE LISTED');
    await I.see('First Hearing');
    await I.seeElement(this.fields.viewEle);
    await I.seeElement(this.fields.cancelEle);

    await I.click(this.fields.viewEle);
    await I.waitForText('View or edit hearing');
    await I.runAccessibilityTest();
    await I.see('WAITING TO BE LISTED');
    await I.see('Projector');
    await I.waitForText('Swansea Civil And Family Justice Centre');
    await I.see('Swansea Civil And Family Justice Centre');
    await I.see('Submit updated request');
    await I.click('Back');
  },

  async clickOnUpdateHearing() {
    await I.waitForElement(this.fields.viewEle);
    await I.click(this.fields.viewEle);
    await I.waitForText('View or edit hearing');
    await I.runAccessibilityTest();
    await I.see('WAITING TO BE LISTED');
  },

  async updateHearingValues() {
    await I.click(this.fields.updateJudgeType);
    await I.waitForText('Do you want a specific judge?');
    await I.click('//input[@value="30"]');
    await I.runAccessibilityTest();
    await I.click('Continue');
    // await I.see('Deputy Circuit Judge, High Court Judge'); - this step is commented due to this exui bug https://tools.hmcts.net/jira/browse/EXUI-1456
    await I.see('AMENDED');


    await I.click(this.fields.updateHearingLength);
    await I.waitForText('Length of hearing');
    await I.clearField(this.fields.hearingDuration);
    await I.fillField(this.fields.hearingDuration, '3');
    await I.click(this.fields.noSpecificDate);
    await I.click('Continue');
    await I.see('3 Hours');
  },

  async submitUpdatedValues() {
    await I.click('Submit updated request');
    await I.click(this.fields.amendReason);
    await I.runAccessibilityTest();
    await I.click('Submit change request');
    await I.see('Hearing request submitted');
    await I.click('view the status of this hearing in the hearings tab');
    await I.waitForText('History');
  },

  async verifyUpdatedHearingStatus() {
    await I.waitForText('UPDATE REQUESTED');
    await I.runAccessibilityTest();
    await I.see('UPDATE REQUESTED');
    await I.see('First Hearing');
    await I.seeElement(this.fields.viewEle);
    await I.seeElement(this.fields.cancelEle);
  },

  async verifyUpdatedHearingDetails() {
    await I.click(this.fields.viewEle);
    await I.waitForText('View or edit hearing');
    await I.see('UPDATE REQUESTED');
    // await I.see('Deputy Circuit Judge, High Court Judge'); - this step is commented due to this exui bug https://tools.hmcts.net/jira/browse/EXUI-1456
    await I.see('3 Hours');
    await I.click('Back');
  },

  async clickCanceHearing() {
    await I.seeElement(this.fields.cancelEle);
    await I.click(this.fields.cancelEle);
    await I.waitForText('Are you sure you want to cancel this hearing?');
    await I.runAccessibilityTest();
    await I.seeNumberOfElements('//input[@type="checkbox"]', eleCount);
    await I.click(this.fields.cancelOption);
    await I.click('Continue');
  },

  async verifyHearingCancellation() {
    await I.waitForText('Current and upcoming');
    await I.runAccessibilityTest();
    await I.waitForText('CANCELLATION REQUESTED');
    await I.see('CANCELLATION REQUESTED');
    await I.dontSeeElement(this.fields.cancelEle);
    await I.click(this.fields.viewDetails);
    await I.waitForText('Cancellation requested');

    const expReason = await I.grabTextFrom(this.fields.cancellationReason);
    const expValue = await I.grabTextFrom(this.fields.cancellationValue);

    assert.equal(expReason.trim(), 'Reason for cancellation');
    assert.equal(expValue, 'Withdrawn');
  },

  async submitHearing() {
    await this.clickOnHearingsTab();
    await this.fillAdditionalFacilities();
    await this.submitPaticipantAttendance();
    await this.submitVenueAndJudgeDetails();
    await this.submitDurationAndAdditionalInfo();
    await this.submitAndVerifyHearingRequest();
  },

  async updateHearing() {
    await I.click(this.fields.hearingsTab);
    await this.clickOnUpdateHearing();
    await this.updateHearingValues();
    await this.submitUpdatedValues();
    await this.verifyUpdatedHearingStatus();
    await this.verifyUpdatedHearingDetails;
  },

  async cancelHearing() {
    await this.clickCanceHearing();
    await this.verifyHearingCancellation();
  }


};