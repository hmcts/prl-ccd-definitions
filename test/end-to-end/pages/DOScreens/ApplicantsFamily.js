const I = actor();
const retryCount = 3;

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Applicant’s family');
  },

  async applicantFamily() {
    await I.waitForElement('#applicantFamilyDetails_doesApplicantHaveChildren_Yes');
    await I.waitForText('Does the applicant have any children, have parental responsibility for any children or need to protect other children with this application?');
    await I.click('#applicantFamilyDetails_doesApplicantHaveChildren_Yes');
    await I.waitForText('Child');
    await I.click('Add new');
    I.wait('2');
    await I.fillField('#applicantChildDetails_0_fullName', 'Child Name1');
    await I.retry(retryCount).fillField('#dateOfBirth-day', '10');
    await I.retry(retryCount).fillField('#dateOfBirth-month', '10');
    await I.retry(retryCount).fillField('#dateOfBirth-year', '2010');
    await I.fillField('#applicantChildDetails_0_applicantChildRelationship', 'Mother');
    await I.click('#applicantChildDetails_0_applicantRespondentShareParental_Yes');
    await I.fillField('#applicantChildDetails_0_respondentChildRelationship', 'Father');
    await I.runAccessibilityTest();
    await I.continueEvent();
  },

  async runEventApplicantsFamily() {
    await this.triggerEvent();
    await this.applicantFamily();
    // I.wait('2');
    await I.retry(retryCount).click('Save and continue');
    // await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
