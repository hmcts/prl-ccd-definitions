const { chromium } = require('playwright');


class CitizenCaseSetup {
  constructor(citizenUrl) {
    this.citizenUrl = citizenUrl;
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();
  }

  async exit() {
    await this.page.close();
    await this.browser.close();
  }

  async waitForLocator(locator) {
    await this.page.locator(locator).waitFor();
  }

  async waitForText(text) {
    await this.page.locator(`//body//*[contains(text(),"${text}")]`).waitFor();
  }

  async getInnerText(locator) {
    const v = await this.page.locator(locator).innerText();
    return v;
  }

  async selectFile(name, filePath) {
    await this.page.locator(`//label[contains(text(),"${name}")]/../input`).setInputFiles(filePath);
  }

  async clickCheckBoxWithLabel(label) {
    const field = this.page.locator(`//label[contains(text(),"${label}")]/../input`);
    await field.waitFor();
    await field.click();
  }

  async clickRadioOption(fieldName, value) {
    const field = this.page.locator(`//*[contains(text(),"${fieldName}")]/..//label[contains(text(),"${value}")]/../input`);
    await field.click();
  }

  async selectOption(name, pos) {
    const field = this.page.locator(`//label[contains(text(),"${name}")]/../select`);
    await field.selectOption({ index: parseInt(pos) });
  }

  async clickLink(linkText) {
    const field = this.page.locator(`//body//a[contains(text(),"${linkText}")]`);
    await field.waitFor();
    await field.click();
  }

  async clickButton(label) {
    const field = this.page.locator(`//body//button[contains(text(),"${label}")]`);
    await field.waitFor();
    await field.click();
  }

  async clickFieldWithID(id) {
    const field = this.page.locator(`#${id}`);
    await field.waitFor();
    await field.click();
  }

  async fillField(name, value) {
    const field = this.page.locator(`//label[contains(text(),"${name}")]/../input`);
    await field.waitFor();
    await field.fill(value);
  }

  async fillFieldWithId(id, value) {
    const field = this.page.locator(`#${id}`);
    await field.waitFor();
    await field.fill(value);
  }

  async enterDate(dateField, day, month, year) {
    const dayField = this.page.locator(`//*[contains(text(),"${dateField}")]/..//label[contains(text(),'Day')]/../input`);
    const monthField = this.page.locator(`//*[contains(text(),"${dateField}")]/..//label[contains(text(),'Month')]/../input`);
    const yearField = this.page.locator(`//*[contains(text(),"${dateField}")]/..//label[contains(text(),'Year')]/../input`);

    await dayField.fill(day);
    await monthField.fill(month);
    await yearField.fill(year);
  }

  async login(username, password) {
    await this.page.goto('https://privatelaw.demo.platform.hmcts.net/');
    const usernameField = this.page.locator('#username');
    const passwordField = this.page.locator('#password');

    await usernameField.fill(username);
    await passwordField.fill(password);
    await this.page.locator('//input[@type = "submit"]').click();
  }
  async runC100(caseDetails) {
    caseDetails.applicant1_firstName = caseDetails.applicant1_firstName ? caseDetails.applicant1_firstName : 'John';
    caseDetails.applicant1_lastName = caseDetails.applicant1_lastName ? caseDetails.applicant1_lastName : 'Doe';

    caseDetails.respondent1_firstName = caseDetails.respondent1_firstName ? caseDetails.respondent1_firstName : 'Mary';
    caseDetails.respondent1_lastName = caseDetails.respondent1_lastName ? caseDetails.respondent1_lastName : 'Richards';

    caseDetails.child1_firstName = caseDetails.child1_firstName ? caseDetails.child1_firstName : 'childfn';
    caseDetails.child1_lastName = caseDetails.child1_lastName ? caseDetails.child1_lastName : 'childln';

    await this.login('familyprivatelaw@gmail.com', 'Password12');
    const caseId = await this.createC100Case(caseDetails);
    return caseId;
  }

  async createC100Case(caseDetails) {
    await this.clickLink('New child arrangements application (C100)');
    await this.clickLink('Your child arrangements application');
    await this.clickButton('Start now');
    await this.waitForText('Where do the children live?');

    await this.fillField('Postcode', 'TW31JX');
    await this.clickButton('Continue');
    await this.waitForText('Do you have a written agreement with the other people in the case that you want the court to review?');
    await this.clickFieldWithID('sq_writtenAgreement-2');
    await this.clickButton('Continue');

    await this.waitForText('Before you go to court');
    await this.clickButton('Continue');

    await this.waitForText('Reaching an agreement without going to court');
    await this.clickButton('Continue');

    await this.waitForText('Will you be using a legal representative in these proceedings?');
    await this.clickFieldWithID('sq_legalRepresentation');
    await this.clickButton('Continue');

    await this.waitForText('Do you want your legal representative to complete the application for you?');
    await this.clickFieldWithID('sq_legalRepresentationApplication-2');
    await this.clickButton('Continue');

    await this.waitForText('Is there any reason that you would need permission from the court to make this application?');
    await this.clickFieldWithID('sq_courtPermissionRequired-2');
    await this.clickButton('Continue');

    await this.waitForText('Are the children involved in any emergency protection, care or supervision proceedings (or have they been)?');
    await this.clickFieldWithID('miam_otherProceedings-2');
    await this.clickButton('Continue');

    await this.waitForText('Attending a Mediation Information and Assessment Meeting (MIAM)');
    await this.clickFieldWithID('miam_consent');
    await this.clickButton('Continue');

    await this.waitForText('Have you attended a MIAM?');
    await this.clickFieldWithID('miam_attendance');
    await this.clickButton('Continue');

    await this.waitForText('Do you have a document signed by the mediator?');
    await this.clickFieldWithID('miam_haveDocSigned');
    await this.clickButton('Continue');

    await this.waitForText('Upload your MIAM certificate');
    await this.selectFile('Select documents to upload', './test/end-to-end/restApiData/dummy.pdf');
    await this.clickButton('Upload file');
    await this.waitForText('applicant__miam_certificate');
    await this.clickButton('Continue');

    await this.waitForText('Your documents');
    await this.clickButton('Continue');

    await this.waitForText('What are you asking the court to do?');
    await this.clickCheckBoxWithLabel('Decide who the children live with and when');
    await this.clickButton('Continue');

    await this.waitForText('What you are asking the');
    await this.clickButton('Continue');

    await this.waitForText('Describe what you want the court to do regarding the children in this application');
    await this.fillFieldWithId('too_shortStatement', 'test summary');
    await this.clickButton('Continue');

    await this.waitForText('Does your situation qualify for an urgent first hearing?');
    await this.clickFieldWithID('hu_urgentHearingReasons-2');
    await this.clickButton('Continue');

    await this.waitForText('Are you asking for a without notice hearing?');
    await this.clickFieldWithID('hwn_hearingPart1-2');
    await this.clickButton('Continue');

    await this.waitForText('Enter the names of the children');
    await this.fillField('First name(s)', caseDetails.child1_firstName);
    await this.fillField('Last name(s)', caseDetails.child1_lastName);
    await this.clickButton('Continue');

    await this.waitForText('Provide details for');
    await this.enterDate('Date of birth', '01', '01', '2020');
    await this.clickRadioOption('Gender', 'Male');
    await this.clickButton('Continue');

    await this.waitForText('Which of the decisions you’re asking the court to resolve relate');
    await this.clickCheckBoxWithLabel('Decide who the children live with and when');
    await this.clickButton('Continue');

    await this.waitForText('Parental responsibility for');
    await this.fillFieldWithId('statement', 'father');
    await this.clickButton('Continue');

    await this.waitForText('Further Information');
    await this.clickRadioOption('Are any of the children known to social services?', 'No');
    await this.clickRadioOption('Are any of the children the subject of a child protection plan?', 'No');
    await this.clickButton('Continue');

    await this.waitForText('Do you or any respondents have other children who are not part of this application?');
    await this.clickFieldWithID('ocd_hasOtherChildren-2');
    await this.clickButton('Continue');

    await this.waitForText('Enter your name');
    await this.fillFieldWithId('applicantFirstName', caseDetails.applicant1_firstName);
    await this.fillFieldWithId('applicantLastName', caseDetails.applicant1_lastName);
    await this.clickButton('Continue');

    await this.waitForText('Do the other people named in this application (the respondents) know any of your contact details?');
    await this.clickFieldWithID('detailsKnown');
    await this.clickButton('Continue');


    await this.waitForText('Keeping your contact details private for');
    await this.clickFieldWithID('start-2');
    await this.clickButton('Continue');

    await this.waitForText('The court will not keep your contact details private');
    await this.clickButton('Continue');

    await this.waitForText('Provide details for');
    await this.clickFieldWithID('haveYouChangeName-2');
    await this.clickRadioOption('Gender', 'Male');
    await this.enterDate('Your date of birth', '01', '01', '2000');
    await this.fillField('Your place of birth', 'test town');
    await this.clickButton('Continue');

    await this.waitForText('relationship to ');
    await this.clickFieldWithID('relationshipType-2');
    await this.clickButton('Continue');

    await this.waitForText('Address of ');
    await this.fillField('Current postcode', 'TW31JX');
    await this.clickButton('Continue');

    await this.waitForText('Select Address of');
    await this.selectOption('Select an address', '2');
    await this.clickButton('Continue');

    await this.waitForText('Have you lived at this address for more than 5 years?');
    await this.clickRadioOption('Have you lived at this address for more than 5 years?', 'Yes');
    await this.clickButton('Continue');

    await this.waitForText('Contact details of ');
    await this.clickFieldWithID('canProvideEmail');
    await this.fillField('Your email address', 'test_applicant1@test.com');
    await this.clickFieldWithID('canProvideTelephoneNumber');
    await this.fillField('Your telephone phone', '09876543211');

    await this.clickFieldWithID('canLeaveVoiceMail');
    await this.clickButton('Continue');

    await this.waitForText('Contact Preferences for');
    await this.clickRadioOption('How would you prefer to be contacted?', 'Digital');
    await this.clickButton('Continue');

    await this.waitForText('Enter the respondent');
    await this.fillField('First name(s)', caseDetails.respondent1_firstName);
    await this.fillField('Last name(s)', caseDetails.respondent1_lastName);
    await this.clickButton('Continue');

    await this.waitForText('Provide details for');
    await this.clickRadioOption('Have they changed their name?', 'No');
    await this.clickRadioOption('Gender', 'Female');

    await this.enterDate('Date of birth', '01', '01', '2001');
    await this.fillField('Place of birth', 'test town2');
    await this.clickButton('Continue');

    await this.waitForText('relationship to');
    await this.clickFieldWithID('relationshipType');
    await this.clickButton('Continue');

    await this.waitForText('Address of ');
    await this.fillField('Current postcode', 'TW31JX');
    await this.clickButton('Continue');

    await this.waitForText('Select Address of');
    await this.selectOption('Select an address', '2');
    await this.clickButton('Continue');

    await this.waitForText('Have they lived at this address for more than 5 years?');
    await this.clickRadioOption('Have they lived at this address for more than 5 years?', 'Yes');
    await this.clickButton('Continue');

    await this.waitForText('Contact details of');
    await this.fillField('Email address', 'respondent_test@test.com');
    await this.fillField('Telephone number', '09876543212');
    await this.clickButton('Continue');

    await this.waitForText('Is there anyone else who should know about your application?');
    await this.clickFieldWithID('oprs_otherPersonCheck-2');
    await this.clickButton('Continue');

    this.waitForText('currently live with?');
    await this.clickCheckBoxWithLabel(caseDetails.respondent1_firstName);
    await this.clickButton('Continue');

    await this.waitForText('Have you or the children ever been involved in court proceedings?');
    await this.clickFieldWithID('op_childrenInvolvedCourtCase-2');
    await this.clickFieldWithID('op_courtOrderProtection-2');
    await this.clickButton('Continue');

    await this.waitForText('Safety concerns');
    await this.clickButton('Continue');

    await this.waitForText('Do you have any concerns for your safety or the safety of the children?');
    await this.clickFieldWithID('c1A_haveSafetyConcerns-2');
    await this.clickButton('Continue');

    await this.waitForText('lives mainly based outside of England and Wales?');
    await this.clickFieldWithID('ie_internationalStart-2');
    await this.clickButton('Continue');

    await this.waitForText('parents (or anyone significant to the children) mainly based outside of England and Wales?');
    await this.clickFieldWithID('ie_internationalParents-2');
    await this.clickButton('Continue');

    await this.waitForText('Could another person in the application apply for a similar order in a country outside England or Wales?');
    await this.clickFieldWithID('ie_internationalJurisdiction-2');
    await this.clickButton('Continue');

    await this.waitForText('Has another country asked (or been asked) for information or help for the children?');
    await this.clickFieldWithID('ie_internationalRequest-2');
    await this.clickButton('Continue');

    await this.waitForText('Would you be able to take part in hearings by video and phone?');
    await this.clickCheckBoxWithLabel('Yes, I can take part in video hearings');
    await this.clickButton('Continue');

    await this.waitForText('Do you have any language requirements?');
    await this.clickCheckBoxWithLabel('No, I do not have any language requirements at this time');
    await this.clickButton('Continue');

    await this.waitForText('Do you or the children need special arrangements at court?');
    await this.clickCheckBoxWithLabel('No, I do not have any safety requirements at this time');
    await this.clickButton('Continue');

    await this.waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');
    await this.clickCheckBoxWithLabel('No, I do not need any support at this time');
    await this.clickButton('Continue');

    await this.waitForText('Do you need help with paying the fee for this application?');
    await this.clickFieldWithID('hwf_needHelpWithFees-2');
    await this.clickButton('Continue');

    await this.waitForText('Check your Answers');
    await this.clickCheckBoxWithLabel('I believe that the facts stated in this application are true');
    await this.clickButton('Pay and submit your application');

    await this.waitForText('want to answer these questions');
    await this.clickButton('want to answer these questions');

    await this.waitForLocator('#card-no');
    await this.fillFieldWithId('card-no', '4444333322221111');
    await this.fillFieldWithId('expiry-month', '01');
    await this.fillFieldWithId('expiry-year', '2030');
    await this.fillFieldWithId('cardholder-name', 'Automation test user');
    await this.fillFieldWithId('cvc', '123');

    await this.fillFieldWithId('address-line-1', 'test Address line 1');
    await this.fillFieldWithId('address-city', 'test Town or city');
    await this.fillFieldWithId('address-postcode', 'TW31JX');
    await this.fillFieldWithId('email', 'test@test.com');
    await this.clickFieldWithID('submit-card-details');

    await this.clickFieldWithID('confirm');

    await this.waitForText('Your application has been submitted');
    const caseId = await this.getInnerText('.govuk-panel--confirmation strong');
    return caseId;
  }
}


module.exports = CitizenCaseSetup;
