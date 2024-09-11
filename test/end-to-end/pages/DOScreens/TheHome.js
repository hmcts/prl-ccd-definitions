const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    lenderFindAddress: 'home_mortgages_address_address',
    landlordAddress: 'home_landlords_address_address'
  },

  async triggerEvent() {
    await I.triggerEvent('The home');
  },
  async theHomeDetails() {
    await I.waitForText('To what address do you want the occupation order to apply?');
    await I.selectPostCodeLookupAddress('home_address_address', 'B11LS');
    await I.wait('2');
    await I.waitForText('Who currently lives at the above address (please select all that apply)? (Optional)');
    await I.runAccessibilityTest();
    await I.click('#home_peopleLivingAtThisAddress-applicant');
    await I.click('#home_peopleLivingAtThisAddress-respondent');
    await I.click('#home_peopleLivingAtThisAddress-applicantChildren');
    await I.click('#home_peopleLivingAtThisAddress-someoneElse');
    await I.fillField('#home_textAreaSomethingElse', 'Text Area');
    await I.click('#home_everLivedAtTheAddress-No');
    await I.click('#home_intendToLiveAtTheAddress-yesBothOfThem');
    await I.click('#home_doAnyChildrenLiveAtAddress_Yes');

    /* Child Details */
    await I.click('Add new');
    await I.wait('2');
    await I.click('#home_children_0_keepChildrenInfoConfidential_Yes');
    await I.fillField('#home_children_0_childFullName', 'Child Name');
    await I.fillField('#home_children_0_childsAge', '6');
    await I.click('#home_children_0_isRespondentResponsibleForChild_Yes');
    // await I.waitForElement('#home_howIsThePropertyAdapted');
    // await I.fillField('#home_howIsThePropertyAdapted', 'Text Area');

    /* Mortgage Details */
    await I.waitForElement('#home_isPropertyAdapted_Yes');
    await I.click('#home_isPropertyAdapted_Yes');
    await I.waitForElement('#home_howIsThePropertyAdapted');
    await I.fillField('#home_howIsThePropertyAdapted', 'Text Area');
    await I.click('#home_isThereMortgageOnProperty_Yes');
    await I.checkOption('#home_mortgages_mortgageNamedAfter-applicant');
    await I.checkOption('#home_mortgages_mortgageNamedAfter-respondent');
    await I.checkOption('#home_mortgages_mortgageNamedAfter-someoneElse');
    await I.fillField('#home_mortgages_textAreaSomethingElse', 'Text Area');
    await I.fillField('#home_mortgages_mortgageNumber', '4545');
    await I.fillField('#home_mortgages_mortgageLenderName', 'Lender Name');
    await I.wait('2');
    await I.selectPostCodeLookupAddress('home_mortgages_address_address', 'SE1 1LB');

    /* Landlord Details */
    await I.waitForElement('#home_isPropertyRented_Yes');
    await I.click('#home_isPropertyRented_Yes');
    await I.checkOption('#home_landlords_mortgageNamedAfterList-applicant');
    await I.checkOption('#home_landlords_mortgageNamedAfterList-respondent');
    await I.checkOption('#home_landlords_mortgageNamedAfterList-someoneElse');
    await I.fillField('#home_landlords_textAreaSomethingElse', 'Text Area');
    await I.fillField('#home_landlords_landlordName', 'Landlord Name');
    // I.wait('5');
    await I.selectPostCodeLookupAddress('home_landlords_address_address', 'B11LS');
    // await I.click(this.fields.landlordFindAddressBtn);
    // await I.wait('2');

    await I.waitForElement('#home_doesApplicantHaveHomeRights_Yes');
    await I.click('#home_doesApplicantHaveHomeRights_Yes');
    await I.checkOption('#home_livingSituation-ableToStayInHome');
    await I.checkOption('#home_livingSituation-ableToReturnHome');
    await I.checkOption('#home_livingSituation-restrictFromEnteringHome');
    await I.checkOption('#home_livingSituation-awayFromHome');
    await I.checkOption('#home_livingSituation-limitRespondentInHome');

    await I.checkOption('#home_familyHome-payForRepairs');
    await I.checkOption('#home_familyHome-payOrContributeRent');
    await I.checkOption('#home_familyHome-useHouseholdContents');
    await I.fillField('#home_furtherInformation', 'Text Area');
    await I.runAccessibilityTest();
    await I.continueEvent();
  },
  async runTheHomeEventHappyPath() {
    await this.triggerEvent();
    await this.theHomeDetails();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
